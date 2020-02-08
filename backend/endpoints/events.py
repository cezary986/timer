import json
import uuid
import os
from tinydb import TinyDB, Query
from shutil import copyfile

EVENTS_FILE_NAME = 'events.json'

EVENTS_TABLE_NAME = 'events'

db = TinyDB('db.json')

def get_events(out, data, **kwargs):
    table = db.table(EVENTS_TABLE_NAME)
    elements = table.all()
    for element in elements:
            element['id'] = element.doc_id
    out.send(elements)

def add_event(out, event, **kwargs):
    table = db.table(EVENTS_TABLE_NAME)
    id = table.insert(event)
    event['id'] = id
    out.send(event)

def delete_event(out, event_uuid, **kwargs):
    table = db.table(EVENTS_TABLE_NAME)
    table.remove(doc_ids=[event_uuid])
    out.send()

def update_event(out, event, **kwargs):
    table = db.table(EVENTS_TABLE_NAME)
    table.update(event, doc_ids=[event.id])
    out.send()

def set_event_background_image(out, img_file_path, **kwargs):
    # TODO
    out.send()