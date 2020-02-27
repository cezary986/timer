import json
import uuid
from tinydb import Query

STATE_TABLE_NAME = 'state'

def read_state_from_db(db):
    table = db.table(STATE_TABLE_NAME)
    elements = table.all()
    if len(elements) > 0:
        elements[0]['id'] = elements[0].doc_id
        return elements[0]
    else:
        return None

def get_state(out, data, **kwargs):
    db = kwargs['scope']['db']
    out.send(read_state_from_db(db))
    
def set_state(out, state, **kwargs):
    db = kwargs['scope']['db']
    state_from_db = read_state_from_db(db)
    table = db.table(STATE_TABLE_NAME)
    if state_from_db is None:
        id = table.insert(state)
    else:
        table.update(state, doc_ids=[state_from_db['id']])
    out.send()
