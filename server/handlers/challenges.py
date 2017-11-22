import datetime
import hashlib
import importlib.util
import os
import uuid
from sanic import response
from sanic.exceptions import ServerError
from tinydb import Query

SUB_TABLE_PREFIX = 'challenge_submissions_'
SUB_DIR = 'submissions/'
CHALLENGES_DIR = 'challenges/'
EVALUATE_FILE = 'evaluate.py'

def challenges(app, db):
    challenges_tbl = db.table('challenges')
    user_tokens_tbl = db.table('user_tokens')


    def get_submissions_table(challenge_id):
        '''
        Retrieves the submissions table for the particular challenge_id.
        '''
        Challenge = Query()
        results = challenges_tbl.search(Challenge.id == challenge_id)

        if not len(results) == 1:
            raise ServerError('Invalid challenge_id.', status_code=404)

        table_key = SUB_TABLE_PREFIX + hashlib.sha1(challenge_id.encode('utf-8'))
        return db.table(table_key)


    @app.route('/challenges/<challenge_id>', methods=['GET'])
    async def challenge_handler(request, challenge_id):
        '''
        Responds with the content of a single challenge for the requested challenge_id.
        '''
        Challenge = Query()
        results = challenges_tbl.search(Challenge.id == challenge_id)

        if len(results) == 0:
            raise ServerError('Challenge does not exist.', status_code=404)
        elif len(results) > 1:
            raise ServerError(
                'Multiple challenges matched - ids are not unique.',
                status_code=500)

        return response.json(results[0])
    

    @app.route('/challenges/<challenge_id>/leaderboard', methods=['GET'])
    async def challenge_leaderboard_handler(request, challenge_id):
        '''
        Responds with the leaderboard for the specific challenge_id.
        '''
        submissions_tbl = get_submissions_table(challenge_id)
  
        # Filter to only keep the top submission per username.
        # TODO

        return response.json({})


    @app.route('/challenges/<challenge_id>/submissions/<user_token>', methods=['GET'])
    async def challenge_submissions_handler(request, challenge_id, user_token):
        '''
        Responds with the user submission history for the specific challenge_id.
        '''
        Token = Query()
        token_results = user_tokens_tbl.search(Token.token == user_token)

        if len(token_results) != 1:
            raise ServerError('Invalid user_token.', status_code=404)

        username = token_results[0]['username']

        submissions_tbl = get_submissions_table(challenge_id)
        Submission = Query()

        results = submissions_tbl.search(Submission.username == username)
        return response.json(results)


    @app.route('/challenges/<challenge_id>/submissions/<user_token>', methods=['POST'])
    async def challenge_submit_handler(request, challenge_id, user_token):
        '''
        Handles challenge submission.
        '''
        Challenge = Query()
        challenge_results = challenges_tbl.search(Challenge.id == challenge_id)
        curr_challenge = challenges_results[0]

        if len(challenge_results) != 1:
            raise ServerError('Invalid challenge_id.', status_code=404)

        Token = Query()
        token_results = user_tokens_tbl.search(Token.token == user_token)

        if len(token_results) != 1:
            raise ServerError('Invalid user_token.', status_code=404)

        username = token_results[0]['username']

        # Save zip file.
        dir = os.path.join(SUB_DIR, challenge_id, username)
        if not os.path.exists(dir):
            os.makedirs(dir)

        sub_id = str(uuid.uuid4())

        zip_path = os.path.join(dir, sub_id + '.zip')
        with open(zip_path, 'wb+') as f:
            f.write(request.body)

        # Evaluate submission.
        evaluator_path = os.path.join(
            CHALLENGES_DIR, curr_challenge['path'], EVALUATE_FILE)

        spec = importlib.util.spec_from_file_location('evaluate', evaluator_path)
        evaluate = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(evaluate)
 
        try:
            score = evaluate.evaluate(zip_path)
            submissions_tbl = get_submissions_table(challenge_id)

            submission_obj = {
                'username': username,
                'sub_id': sub_id,
                'score': score,
                'created_at': str(datetime.datetime.now()),
            }
            submissions_tbl.insert(submission_obj)

            return response.json(submission_obj)
        except:
            raise ServerError('Error evaluating submission.', status_code=500)
