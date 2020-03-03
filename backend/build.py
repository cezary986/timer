import sys
import json
from tinydb import TinyDB
import os
import subprocess
from argparse import ArgumentParser

PATH_TO_THEMES_FILE = './resources/color_themes.json'
DB_FILE = './dist/db.json'


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--dev', action='store_true', dest='dev_version')
    args = parser.parse_args()

    install_command = 'pyinstaller ./main.py -F --clean'
    if args.dev_version != True:
      # no console output for release version
      install_command += ' --noconsole'
    subprocess.call(install_command)

    print('Saving themes to db')
    with open(PATH_TO_THEMES_FILE, encoding='utf-8') as file:
      themes = json.load(file)
      db = TinyDB(DB_FILE, ensure_ascii=False)
      table = db.table('color_themes')
      
      for theme in themes:
        table.insert(theme)
