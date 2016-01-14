'use strict';

const electron = require('electron');
const ipcMain = electron.ipcMain;

class Emit {
  constructor(browser) {
    this.browser = browser;
  }

  fire(event, details) {
    this.browser.webContents.send(event, details);
  }

  on(event, fn) {
    ipcMain.on(event, fn);
  }
}

module.exports = (browser) => {
  return new Emit(browser);
};
