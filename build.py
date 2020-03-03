"""
Script building both part of the apliactions:
  - Python backend
  - Electron front-end app
  - Angular app rendered by electron
"""

import os
from shutil import copy2, rmtree
import time

current_path =  os.getcwd()
print('Clean')
rmtree(current_path + '\\frontend\\timer-win32-x64', ignore_errors=True)

print('Building Python app:')
os.chdir('./backend')
os.system('START ./env/Scripts/python.exe ./build.py')

print('Building Electron app:')
os.chdir('../frontend')
os.system('npm run release-win32')

# copy python exe to electron dist folder

copy2(current_path + '\\backend\\dist\\main.exe', current_path + '\\frontend\\timer-win32-x64')
copy2(current_path + '\\backend\\dist\\db.json', current_path + '\\frontend\\timer-win32-x64\\resources')

time.sleep(4)
rmtree(current_path + '\\dist', ignore_errors=True)
os.mkdir(current_path + '\\dist')
copy2(current_path + '\\frontend\\timer-win32-x64', current_path + '\\dist')
