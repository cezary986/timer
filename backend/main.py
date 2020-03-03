import os
from igor.server import IgorServer
import os 
import json
from threading import Thread
import time
import subprocess
from argparse import ArgumentParser
from tinydb import TinyDB
import _thread

from endpoints.events import EVENTS_API
from endpoints.themes import THEMES_API
from endpoints.state import STATE_API

from igor.core import flatten
from igor.server import CONFIG

def shutdown(out, data, **kwargs):
    _thread.interrupt_main()


CONFIG['file_server_config'] = {
        'enable': True,
        'port': 8080,
        'root_directory': os.path.dirname(__file__)
    }

ACTIONS = {
    'events': EVENTS_API,
    'color_themes': THEMES_API,
    'state': STATE_API,
    'shutdown': shutdown
}


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--dev', action='store_true', dest='dev_version')
    args = parser.parse_args()

    igor = IgorServer(api=flatten(ACTIONS), config=CONFIG)
    
    db = None

    if args.dev_version == True:
        # Run dev version - in browser
        igor.scope['db'] = TinyDB('db.json')
    else:
        # Run prod versoin with electron
        frontend_process = subprocess.Popen(['timer.exe'])
        igor.bind_with_ui_process(frontend_process)
        igor.scope['db'] = TinyDB('./resources/db.json')

    igor.run_forever()
    