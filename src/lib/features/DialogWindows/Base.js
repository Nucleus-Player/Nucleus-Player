'use strict';

const electron = require('electron');
const shell = electron.shell;
const BrowserWindow = electron.BrowserWindow;

module.exports = (browser) => {
  class BaseDialog {
    constructor() {
      this.browser = browser;
      this._id = WindowManager.getKey();

      this.window = new BrowserWindow({
        center: true,
        show: false,
        frame: false,
        resizable: false,
        skipTaskbar: true,
        backgroundColor: '#FFF',
      });

      WindowManager.add(this._id, this.window);
      this.window.loadURL('file://' + __dirname + '/../../../public_html/dialog.html');
      this.window.webContents.executeJavaScript('window.WINDOW_ID = "' + this._id + '"');
      this.window.show();
      this.window.on('close', () => {
        this.window = null;
      });
      this.browser.on('focus', () => {
        if (this.window) {
          this.window.focus();
          shell.beep();
        }
      });
    }

    getID() {
      return this._id;
    }

    loadUrl(url) {
      console.log(url);
      this.window.webContents.executeJavaScript('window.goTo("' + url + '")');
    }

    show() {
      this.window.show();
    }

    hide() {
      this.window.hide();
    }

    close() {
      this.window.close();
      this.window = null;
    }

    destroy() {
      this.window.destroy();
      this.window = null;
    }
  }

  return BaseDialog;
};
