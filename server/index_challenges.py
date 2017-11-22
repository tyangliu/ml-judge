import frontmatter
import os
from tinydb import TinyDB, Query

ROOT_DIR = 'challenges/'

DESC_FILE = 'description.md'
RES_FILE  = 'resources.md'
SUB_FILE  = 'submission.md'

DB_PATH = 'db.json'


def index_challenges(
    root=ROOT_DIR,
    path=None,
    desc_file=DESC_FILE,
    res_file=RES_FILE,
    sub_file=SUB_FILE
):
    # If no path is given, index all subdirectories.
    if path is None:
        # index all paths
        for item in os.listdir(root):
            if os.path.isdir(os.path.join(root, item)):
                index_challenges(root, item, desc_file, res_file, sub_file)
        return

    dir = os.path.join(root, path)

    desc_path = os.path.join(dir, desc_file)
    res_path = os.path.join(dir, res_file)
    sub_path = os.path.join(dir, sub_file)

    desc = frontmatter.load(desc_path) 
    res = frontmatter.load(res_path)
    sub = frontmatter.load(sub_path)

    save(path, desc, res, sub)


def save(path, desc, res, sub):
    db = TinyDB(DB_PATH)
    Challenge = Query()

    challenges = db.table('challenges')
    challenges.upsert({
        'id': desc['id'],
        'path': path,
        'title': desc['title'],
        'date': str(desc['date']),
        'due_date': str(desc['due-date']),
        'difficulty': desc['difficulty'],
        'type': desc['type'],
        'description': desc.content,
        'resources': res.content,
        'submission': sub.content,
    }, Challenge.id == desc['id'])

    challenges_list = db.table('challenges_list')
    challenges_list.upsert({
        'id': desc['id'],
        'title': desc['title'],
        'date': str(desc['date']),
        'due_date': str(desc['due-date']),
    }, Challenge.id == desc['id'])