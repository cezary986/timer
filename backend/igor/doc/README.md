# Igor Server

Simple solution fo integrating python and modern web-based desktop apps e.g writen in Elector.

Igor consists of two main parts:
* server - it provides your clients processes with easy access to your python API.
* clients - your application, for example rendered processs in Electron.

Igor's using websockets for communication which gives you easy and bideractional communication beetween your client and python backend. 

## Usage

## Creating API
Usage of this module is quite easy. First you need some python code which you want your client to use. Just write whatever python code you wish. Then you need to create an API out of it. API object is a dictionary object with a following structure:

```python
API = {
  'action_identifier': action_handler_function,
  ... 
}
```

Your handler function will be called bye server each time any of your clients calls for certain action.
Exampler handler function can looks like this:

```python
def hello(output, data, **kwargs):
    name = data['name']
    output.send('Hello ' + name)
```
It allways takes three parameters:
* output - stream object which allows you to send data back to client
* data - data object (dictionary) passed to you by client
* **kwargs - for additional data (session, scope - see below)

Igor server will populates those parameters for you.

## Starting server

In your main block of code you need to start your Igor server instance. Minimalistic example is below:
```python

server = IgorServer(api=API)
igor.run_forever()

```
This will start server with default port and host which is: `localhost:5678`. You can customize it by rewriting config object

```python
from igor.server import CONFIG

IGOR_CONFIG = CONFIG

CONFIG['port'] = 5000

server = IgorServer(host='127.0.0.1', api=API, config=CONFIG)
igor.run_forever()

```
see the code for all available fields.

## Processes

Examples above only covers scenario when your client ask your backend for some action, you handle it and send him some data. Another use case could be to have a certain `process` in your python code which will run independently and send some data to clients as it runs. This is possible to achieve by using so called `processes`. 

| processes are implemented as Threads here

To create background process you need your Thread class and its instance. Below is an example:

```python

class BacgroundProcess(Thread):
     def __init__(self):
         Thread.__init__(self)
         self.process_id = None # will be populated by igor server
         self.output = None # will be populated by igor server
         self.counter = 0

     def run(self):
        print('BacgroundProcess run')
        while True:
            time.sleep(1)
            self.counter = self.counter + 1
            # you can use output here because Igor server populated it
            self.output.send(action='counter_increment', data={'counter': self.counter})


igor = IgorServer(api=ACTIONS)
igor.add_process('counter_process', BacgroundProcess())
igor.run_forever()
```

Process output object is different from handler output object. It allows you to send data the same way as function handelr output (see example above), this will send data to every client connected to server. You can also send data to specific client using his id:

```python
def run(self):
  self.output.send('special_for_you', 'only_for_client_1', client_id=1)

```

## Session and scope

If you want to store some data connected to your client in beetween different actions calls you can do this using `session` object. It is just dictionary object (each client has its own). You cant read and write there whatever you want and it will live as long as client's connection will (+10 second of timeout).

If you want to store some data which is common for all clients you cant use `scope` object. It works similar to `session` but is common for all clients and lives as long as server lives.

To access `session` and `scope` objects:

* in action handler function (for scope it will be kwargs['scope']):

```python
  def hello(out, data, **kwargs):
      name = data['name']
      # get session object
      session = kwargs['session']
      # write session
      session['name'] = 'Oskar'
      out.send('Hello ' + name)

  def bye(out, data, **kwargs):
      # read session
      name = kwargs['session']['name']
      out.send('Bye ' + name)
```

* in process (Scope)

```python
  class BacgroundProcess(Thread):
      def __init__(self):
          Thread.__init__(self)
          self.scope = None
          self.process_id = None
          self.output = None 

      def run(self):
          # write scope
          self.scope['process_id'] = self.process_id
          # read scope
          data = self.scope['data']
          self.output.send('scope_data', data)

```
* in process (Session)

  Because process works outside the scope of single client it cannot access client's session so easily. They need to use specific client's id to get its session.

  ```python
  class BacgroundProcess(Thread):
      def __init__(self):
          Thread.__init__(self)
          self.scope = None
          self.process_id = None
          self.output = None 

      def run(self):
          # write scope
          self.sessions['client_1'] = self.process_id
          # read scope
          data = self.sessions['client_1']['data']
          self.output.send('client_1_session_data', data)
  ```

## Files

Igor isn't supposed to serve files itself but it has built in file server. For more details see `file_server.md`