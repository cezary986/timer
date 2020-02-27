from endpoints.events import get_events, add_event, delete_event, update_event, set_event_background_image
from endpoints.themes import get_color_themes
from endpoints.state import get_state, set_state
import os
from igor.server import IgorServer
import os 
import json
from threading import Thread
import time
import subprocess
from argparse import ArgumentParser
from tinydb import TinyDB

from igor.server import CONFIG


ACTIONS = {
    'get_events': get_events,
    'add_event': add_event,
    'delete_event': delete_event,
    'update_event': update_event,
    'get_color_themes': set_event_background_image,

    'get_color_themes': get_color_themes,

    'get_state': get_state,
    'set_state': set_state,
}

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--dev', action='store_true', dest='dev_version')
    args = parser.parse_args()

    igor = IgorServer(api=ACTIONS)
    
    db = None

    if args.dev_version == True:
        # Run dev version - in browser
        igor.scope['db'] = TinyDB('db.json')
    else:
        # Run prod versoin with electron
        frontend_process = subprocess.Popen(['timer.exe'])
        igor.bind_with_frontend_process(frontend_process)
        igor.scope['db'] = TinyDB('./resources/db.json')

    igor.run_forever()
    