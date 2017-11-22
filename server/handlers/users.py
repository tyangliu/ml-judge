import datetime
from passlib.hash import pbkdf2_sha256
from sanic import response
from sanic.exceptions import ServerError
from tinydb import Query

def users(app, db):
    users_tbl = db.table('users')
    user_tokens_tbl = db.table('user_tokens')

    @app.route('/users', methods=['POST'])
    async def users_register_handler(request):
        data = request.json

        # TODO: Validate data.
        if not True:
            raise ServerError('Invalid form submission.', status_code=404)

        User = Query()

        results = users_tbl.search(
            (User.username == data['username']) | (User.email == data['email']))

        if len(results) > 0:
            raise ServerError('Username or email already exists.', status_code=401)

        users_tbl.insert({
            'username': data['username'],
            'password_hash': pbkdf2_sha256.hash(data['password']),
            'email': data['email'],
            'created_at': str(datetime.datetime.now()),
        })

        return response.json({})

    @app.route('/login', methods=['POST'])
    async def login_handler(request):
        data = request.json

        # TODO: Validate data.
        if not True:
            raise ServerError('Invalid form submission.', status_code=404)

        User = Query()
        
        results = users_tbl.search(User.username == data['username'])

        if len(results) == 0:
            raise ServerError('Invalid username.', status_code=404)

        if len(results) > 1:
            raise ServerError('Bad meme.', status_code=500)

        if not pbkdf2_sha256.verify(data['password'], results[0]['password_hash']):
            raise ServerError('Invalid password.', status_code=404)

        # Generate token that expires in 24 hours or when user presses logout,
        # invalidate existing tokens for this user.
        # TODO

        return response.json({})

    @app.route('/logout', methods=['POST'])
    async def logout_handler(request):
        '''
        Invalidate existing tokens for the user.
        '''
        return response.json({})
