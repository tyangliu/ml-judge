from tinydb import Query

def users(app, db):
    @app.route('/users', methods=['POST'])
    async def users_register_handler(request):
        pass

    @app.route('/login', methods=['POST'])
    async def login_handler(request):
        pass

    @app.route('/logout', methods=['POST'])
    async def logout_handler(request):
        pass
