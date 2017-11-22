from sanic import response
from tinydb import Query

def home(app, db):
    challenges_list_tbl = db.table('challenges_list')

    @app.route('/')
    async def home(request):
        return response.json(challenges_list_tbl.all())
