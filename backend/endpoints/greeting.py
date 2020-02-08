

def hello(out, data, **kwargs):
    name = data['name']
    print('Hello')
    session = kwargs['session']
    session['name'] = 'Oskar'
    out.send('Hello ' + name)

def bye(out, data, **kwargs):
    name = kwargs['session']['name']
    print('Bye')
    out.send('Bye ' + name)