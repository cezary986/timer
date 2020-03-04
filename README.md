# Timer countdown

[logo]: https://raw.githubusercontent.com/cezary986/timer/master/docs/screen.png "Screen"

Simple desktop app for counting down to events dates.

# Architecture

App consists of three parts:
* Python backend app
* Angular frontend app
* Electron desktop app (using angular compiled app)

Python and electron communication are done using [Igor](https://github.com/cezary986/igor) library.

# Building

All Python requirements are in `backend/requirements.txt` file, to install them use:

```bash
pip install -r ./backedn/requirements.txt
````

All JS dependencies are in `package.json`, to install them use:

```bash
npm install
```

Then to build the app use `build.py` file in root folder:

```bash
python build.py
```

After building your app should be in `dist` folder. To start it double click `main.exe` file.
### Techologies
* Python
* Electron
* [Igor](https://github.com/cezary986/igor)

