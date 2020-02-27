import sys
import json
from tinydb import TinyDB


# os.system('CALL %CD%\env\Scripts\activate.bat')
# os.system('pyinstaller ./main.py -F --clean --noconsole')

print('saving themes to db...')
with open('./resources/color_themes.json') as file:
    themes = json.load(file)
    db = TinyDB('./db.json')
    table = db.table('color_themes')
    
    for theme in themes:
      table.insert(theme)