'use strict';

const electron = require('electron');
// const path = require('path');
const BrowserWindow = electron.BrowserWindow;

module.exports = (browser) => {
  class BaseDialog {
    constructor() {
      this.browser = browser;

      this.window = new BrowserWindow({
        center: true,
        show: false,
        frame: false,
        resizable: false,
        skipTaskbar: true,
        alwaysOnTop: true,
        backgroundColor: '#FFF',
      });
    }

    loadUrl(url) {
      this.window.loadURL(url);
    }

    show() {
      this.window.show();
    }

    hide() {
      this.window.hide();
    }

    close() {
      this.window.close();
    }

    destroy() {
      this.window.destroy();
    }
  }

  return BaseDialog;
};
