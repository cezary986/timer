from endpoints.greeting import hello, bye
from endpoints.events import get_events, add_event, delete_event, update_event, set_event_background_image
import os
from igor.server import IgorServer
import os 
import json
from threading import Thread
import time
import subprocess
from argparse import ArgumentParser

from igor.server import CONFIG

ACTIONS = {
    'hello': hello,
    'bye': bye,

    'get_events': get_events,
    'add_event': add_event,
    'delete_event': delete_event,
    'update_event': update_event,
    'set_event_background_image': set_event_background_image,
}

if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument("-production", "--prod", dest="production")
    args = parser.parse_args()

    igor = IgorServer(api=ACTIONS)
    if args.production == True:
        # Start electron app
        frontend_process = subprocess.Popen(['timer.exe'])
        igor.bind_with_frontend_process(frontend_process)
    igor.run_forever()
    