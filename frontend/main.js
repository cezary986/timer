const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const os = require('os');

global.sharedObject = { prop1: process.argv }

let mainWindow

function createWindow() {
  Menu.setApplicationMenu(null)
  mainWindow = new BrowserWindow({
    width: 676,
    height: 540,
    minWidth: 676,
    minHeight: 540,
    webPreferences: {
      nodeIntegration: true
    },
    title: "Count down",
  })
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/timer/index.html'), // important
      protocol: 'file:',
      slashes: true,
    })
  );
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

