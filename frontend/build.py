import sys
import os
from shutil import copy2, rmtree, copytree
from argparse import ArgumentParser
import time

DIST_FOLDER = '\\timer-win32-x64'

"""
Additional dependencied from node modules which are required. Instead of
copying whole node_modules which is heavy, only those modules are copied.
"""
ADDITIONAL_DEPENDENCIES = [
  'ws'
]


def build_frontend():
    current_path =  os.getcwd()
    node_modules_path = current_path + DIST_FOLDER + '\\resources\\app\\node_modules'
    try:
      os.mkdir(node_modules_path)
    except Exception:
      current_path = current_path + '\\frontend\\'
      node_modules_path = current_path + DIST_FOLDER + '\\resources\\app\\node_modules'
      os.mkdir(node_modules_path)

    print('Copying required modules from node_modules...')
    for module_name in ADDITIONAL_DEPENDENCIES:
      print('Copying ws')
      copytree(current_path + '\\node_modules\\' + module_name, node_modules_path + '\\' + module_name)

