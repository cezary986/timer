"""
Script building both part of the apliactions:
  - Python backend
  - Electron front-end app
  - Angular app rendered by electron
"""

import os

print('Building Python app:')
os.chdir('./backend')
os.system('./build.bat')

print('Building Electron app:')
os.chdir('../frontend')
os.system('npm run release-win32')
