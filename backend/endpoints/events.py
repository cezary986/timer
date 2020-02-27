import json
import uuid
from tinydb import Query

EVENTS_TABLE_NAME = 'events'


def get_events(out, data, **kwargs):
    db = kwargs['scope']['db']
    table = db.table(EVENTS_TABLE_NAME)
    elements = table.all()
    for element in elements:
            element['id'] = element.doc_id
    out.send(elements)

def add_event(out, event, **kwargs):
    db = kwargs['scope']['db']
    table = db.table(EVENTS_TABLE_NAME)
    id = table.insert(event)
    event['id'] = id
    out.send(event)

def delete_event(out, event_id, **kwargs):
    db = kwargs['scope']['db']
    table = db.table(EVENTS_TABLE_NAME)
    table.remove(doc_ids=[event_id])
    out.send()

def update_event(out, event, **kwargs):
    db = kwargs['scope']['db']
    table = db.table(EVENTS_TABLE_NAME)
    table.update(event, doc_ids=[event['id']])
    out.send()

def set_event_background_image(out, img_file_path, **kwargs):
    # TODO
    out.send()