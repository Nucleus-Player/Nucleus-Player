'use strict';

if (require('./index_squirrel')) {
  process.exit(0);
}

const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;  // Module to create native browser window.

global.Settings = new (require('./lib/Settings'))();
global.Logger = new (require('./lib/Logger'))();
global.WindowManager = new (require('./lib/WindowManager'));
require('./lib/configureApp')(app);

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow = null;

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
app.on('ready', () => {
  mainWindow = new BrowserWindow(require('./lib/configureBrowser')(electron, app));

  global.Emit = require('./lib/Emitter.js')(mainWindow);


  require('./lib/features')(mainWindow, app);
  require('./lib/windows')(mainWindow);

  // and load the index.html of the app.
  mainWindow.loadURL('file://' + __dirname + '/public_html/index.html');

  const dialog = new (require('./lib/features/DialogWindows/LastFMAuth')(mainWindow))();
  console.log('Authenticating');
  dialog.init().then((key) => {
    console.log('Last FM Key:', key);
  }).catch(() => {
    console.log('Error while authenticating');
  });

  // Open the DevTools.
  // mainWindow.webContents.openDevTools();

  // Emitted when the window is closed.
  mainWindow.on('closed', () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
});
