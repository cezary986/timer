"""
Script building both part of the apliactions:
  - Python backend
  - Electron front-end app
  - Angular app rendered by electron
"""

import sys
import os
from shutil import copy2, rmtree, move, copytree
from distutils.dir_util import copy_tree
from argparse import ArgumentParser
import time

from frontend.build import build_frontend
from backend.build import build_python

main_current_path =  os.getcwd()


if __name__ == '__main__':
    parser = ArgumentParser()
    parser.add_argument('--skip-angular', action='store_true', dest='skip_angular')
    parser.add_argument('--skip-python', action='store_true', dest='skip_python')
    args = parser.parse_args()

    print('Clean')
    rmtree(main_current_path + '\\frontend\\timer-win32-x64', ignore_errors=True)

    os.chdir('./frontend')
    print(os.getcwd())
    install_command = None
    if args.skip_angular == True:
      print('Skipping Angular app, Building Electron app')
      install_command = 'npm run build-electron'
    else:
      print('Building Angular + Electron app')
      install_command = 'npm run release-win32'
    os.system(install_command)

    os.chdir('../backend')
    if args.skip_python != True:
      print('Building Python app:')
      build_python()
    else:
      print('Skipping python app')

    os.chdir('../frontend')
    build_frontend()

    print('Copy to dist folder...')
    dist_folder_path = os.getcwd() + '\\..\\dist'
    copy_tree(os.getcwd() + '\\timer-win32-x64', dist_folder_path)
    
    print('BUILD SUCCESSFUL')
