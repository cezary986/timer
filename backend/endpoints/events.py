import json
import uuid
import os
import sys
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

def set_event_background_image(out, data, **kwargs):
    event_id = data['eventId']
    file_path = data['filePath']
    db = kwargs['scope']['db']
    table = db.table(EVENTS_TABLE_NAME)
    event = table.get(doc_id=event_id)
    current_path = os.path.dirname(__file__)
    try:
        if event.get('backgroundImage', None) is not None:
            os.remove('./' + event['backgroundImage'].replace('\\', '/'))
    except Exception as error:
        print(error)
        out.send('Cannot delete file:' + event['backgroundImage'] + str(error))
    
    event['backgroundImage'] = file_path
    table.update(event, doc_ids=[event_id])
    out.send()


EVENTS_API = {
    'get': get_events,
    'add': add_event,
    'update': update_event,
    'delete': delete_event,
    'set_background_image': set_event_background_image
}