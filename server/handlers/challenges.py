from sanic import response
from sanic.exceptions import ServerError
from tinydb import Query

def challenges(app, db):
    challenges_tbl = db.table('challenges')

    @app.route('/challenges/<challenge_id>', methods=['GET'])
    async def challenge_handler(request, challenge_id):
        '''
        Responds with the content of a single challenge for the requested challenge_id.
        '''
        Challenge = Query()
        result = challenges_tbl.search(Challenge.id == challenge_id)

        if len(result) == 1:
            return response.json(result[0])
        elif len(result) == 0:
            raise ServerError('Challenge does not exist.', status_code=404)
        else:
            raise ServerError(
                'Multiple challenges matched - ids are not unique.',
                status_code=500)
    
    @app.route('/challenges/<challenge_id>/leaderboard', methods=['GET'])
    async def challenge_leaderboard_handler(request, challenge_id):
        '''
        Responds with the leaderboard for the specific challenge_id.
        '''
        return response.json({})

    @app.route('/challenges/<challenge_id>/submissions/<user_token>', methods=['GET'])
    async def challenge_submissions_handler(request, challenge_id, user_token):
        '''
        Responds with the user submission history for the specific challenge_id.
        '''
        return response.json({})

    @app.route('/challenges/<challenge_id>', methods=['POST'])
    async def challenge_submit_handler(request, challenge_id):
        '''
        Handles challenge submission.
        '''
        return response.json({})
