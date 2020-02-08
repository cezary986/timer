const { app, BrowserWindow, ipcMain } = require('electron')
const url = require("url");
const path = require("path");
const os = require('os');

global.sharedObject = {prop1: process.argv}

console.log(global.sharedObject);


let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 530,
    height: 500,
    minWidth: 530,
    minHeight: 500,
    webPreferences: {
      nodeIntegration: true
    },
  })
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'dist/timer/index.html'), // important
      protocol: 'file:',
      slashes: true,
      // baseUrl: 'dist'
    })
  );
  mainWindow.removeMenu();
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

