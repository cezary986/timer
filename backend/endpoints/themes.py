import json
from tinydb import Query

THEMES_TABLE_NAME = 'color_themes'

def get_color_themes(out, data, **kwargs):
    db = kwargs['scope']['db']
    table = db.table(THEMES_TABLE_NAME)
    elements = table.all()
    for element in elements:
            element['id'] = element.doc_id
    print(elements)
    out.send(elements)

