import hashlib
from sanic import response
from sanic.exceptions import ServerError
from tinydb import Query

SUB_TABLE_PREFIX = 'challenge_submissions_'

def challenges(app, db):
    challenges_tbl = db.table('challenges')

    def get_submissions_table(challenge_id):
        '''
        Retrieves the submissions table for the particular challenge_id.
        '''
        Challenge = Query()
        results = challenges_tbl.search(Challenge.id == challenge_id)

        if not len(results) == 1:
            raise ServerError('Invalid challenge_id.', status_code=404)

        table_key = SUB_TABLE_PREFIX + hashlib.sha1(challenge_id)
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

        return response.json({})

    @app.route('/challenges/<challenge_id>/submissions/<user_token>', methods=['GET'])
    async def challenge_submissions_handler(request, challenge_id, user_token):
        '''
        Responds with the user submission history for the specific challenge_id.
        '''
        submissions_tbl = get_submissions_table(challenge_id)

        return response.json({})

    @app.route('/challenges/<challenge_id>', methods=['POST'])
    async def challenge_submit_handler(request, challenge_id):
        '''
        Handles challenge submission.
        '''
        submissions_tbl = get_submissions_table(challenge_id)

        return response.json({})
