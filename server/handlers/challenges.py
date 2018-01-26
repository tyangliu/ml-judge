import datetime
import hashlib
import importlib.util
import json
import os
import operator
import uuid
from sanic import response
from sanic.exceptions import ServerError
from tinydb import Query

SUB_TABLE_PREFIX = 'challenge_submissions_'
SUB_DIR = 'submissions/'
CHALLENGES_DIR = 'challenges/'
EVALUATE_FILE = 'evaluate.py'

def challenges(app, db):
    challenges_list_tbl = db.table('challenges_list')
    challenges_tbl = db.table('challenges')
    user_tokens_tbl = db.table('user_tokens')


    def get_submissions_table(challenge_id):
        '''
        Retrieves the submissions table for the particular challenge_id.
        '''
        Challenge = Query()
        results = challenges_tbl.search(Challenge.id == challenge_id)

        if not len(results) == 1:
            err = {
                'message': 'Invalid challenge_id.',
            }
            return response.json(
                err,
                status_code=404,
            )

        table_key = SUB_TABLE_PREFIX + hashlib.sha1(challenge_id.encode('utf-8')).hexdigest()
        return db.table(table_key)


    @app.route('/challenges', methods=['GET', 'OPTIONS'])
    async def challenges_handler(request):
        return response.json(challenges_list_tbl.all())


    @app.route('/challenges/<challenge_id>', methods=['GET', 'OPTIONS'])
    async def challenge_handler(request, challenge_id):
        '''
        Responds with the content of a single challenge for the requested challenge_id.
        '''
        Challenge = Query()
        results = challenges_tbl.search(Challenge.id == challenge_id)

        if len(results) == 0:
            err = {
                'message': 'Challenge does not exist.',
            }
            return response.json(
                err,
                status_code=404,
            )
        elif len(results) > 1:
            err = {
                'message': 'Multiple challenges matched - ids are not unique.',
            }
            return response.json(
                err,
                status_code=404,
            )

        return response.json(results[0])
    

    @app.route('/challenges/<challenge_id>/leaderboard', methods=['GET', 'OPTIONS'])
    async def challenge_leaderboard_handler(request, challenge_id):
        '''
        Responds with the leaderboard for the specific challenge_id.
        '''
        submissions_tbl = get_submissions_table(challenge_id)
        submissions = submissions_tbl.all()

        Challenge = Query()
        results = challenges_tbl.search(Challenge.id == challenge_id)
        curr_challenge = results[0]

        top_submissions = {}

        reverse_scores = curr_challenge['score_order'] == 'reverse'
  
        # Filter to only keep the top submission per username.
        for sub in submissions:
            if (sub['username'] not in top_submissions):
                top_submissions[sub['username']] = sub
            elif (reverse_scores):
                if top_submissions[sub['username']]['score'] > sub['score']:
                    top_submissions[sub['username']] = sub
            elif top_submissions[sub['username']]['score'] < sub['score']: 
                top_submissions[sub['username']] = sub

        leaderboard = []
        for key, value in top_submissions.items():
            leaderboard.append(value)

        leaderboard = sorted(leaderboard, key=lambda s: s['score'], reverse=(not reverse_scores))

        return response.json(leaderboard)


    @app.route('/challenges/<challenge_id>/submissions/<user_token>', methods=['GET', 'OPTIONS'])
    async def challenge_submissions_handler(request, challenge_id, user_token):
        '''
        Responds with the user submission history for the specific challenge_id.
        '''
        Token = Query()
        token_results = user_tokens_tbl.search(Token.token == user_token)

        if len(token_results) != 1:
            err = {
                'message': 'Invalid user_token.',
            }
            return response.json(
                err,
                status_code=404,
            )

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

        if len(challenge_results) != 1:
            err = {
                'message': 'Invalid challenge_id.',
            }
            return response.json(
                err,
                status_code=404,
            )

        curr_challenge = challenge_results[0]

        Token = Query()
        token_results = user_tokens_tbl.search(Token.token == user_token)

        if len(token_results) != 1:
            err = {
                'message': 'Invalid user_token.',
            }
            return response.json(
                err,
                status_code=404,
            )

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
                'created_at': datetime.datetime.now().isoformat(),
            }
            submissions_tbl.insert(submission_obj)

            return response.json(submission_obj)
        except:
            err = {
                'message': 'Error evaluating submission.',
            }
            return response.json(
                err,
                status_code=404,
            )
