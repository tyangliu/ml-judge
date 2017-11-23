from sanic import Sanic
from sanic_cors import CORS
from tinydb import TinyDB

from handlers.challenges import challenges
from handlers.users import users

DB_PATH = 'db.json'

app = Sanic(__name__)
CORS(app)

db = TinyDB(DB_PATH)

challenges(app, db)
users(app, db)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
