from sanic import Sanic
from tinydb import TinyDB

from handlers.home import home
from handlers.challenges import challenges
from handlers.users import users

DB_PATH = 'db.json'

app = Sanic(__name__)
db = TinyDB(DB_PATH)

home(app, db)
challenges(app, db)
# users(app, db)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
