'use strict';

const _ = require('lodash');
const electron = require('electron');
const path = require('path');
const BrowserWindow = electron.BrowserWindow;

const screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
const NOTIFICATION_DURATION = 3000;

class Notification {
  constructor(text, options, feedback) {
    this.options = options;
    this.feedback = feedback;
    this.window = new BrowserWindow({
      x: 0,
      y: 0,
      useContentSize: true,
      show: false,
      frame: false,
      resizable: false,
      skipTaskbar: true,
      alwaysOnTop: true,
      backgroundColor: '#FFF',
    });

    this.window.loadURL('file://' + path.resolve(__dirname + '/../../public_html/notify.html'));
    this.window.webContents.on('did-frame-finish-load', () => {
      this.window.webContents.executeJavaScript(
        'window.NOTIFY_DATA = ' + JSON.stringify([options]) + '[0]; renderNotification();');
    });

    Emit.once('window:notify:ready', (event, details) => {
      const id = details._id;
      if (this.window && id === this.options._id) {
        this.window.setSize(details.width, details.height);
        this.window.setPosition(screenSize.width - this.window.getSize()[0] - 10,
                                screenSize.height - this.window.getSize()[1] - 10);
        this.window.show();
        setTimeout(() => {
          this.close();
        }, NOTIFICATION_DURATION);
      }
    });
  }

  close() {
    if (this.window && this.window.close) {
      try {
        this.window.close();
        this.window = null;
      } catch (e) {
        // Do nothing, this is just to ensure that errors aren't thrown on
        // notification race conditions
      }
    }
  }
}

module.exports = (browser) => {
  let currentNotification;
  let notifyInProgress = false;
  const queue = [];
  const handleNotify = (event, notificationConfig) => {
    notifyInProgress = true;
    if (currentNotification) {
      currentNotification.close();
      currentNotification = null;
    }
    currentNotification = new Notification(notificationConfig.title,
                                            notificationConfig,
                                            event.sender.send);
    if (queue.length === 0) {
      notifyInProgress = false;
    } else {
      queue[0]();
    }
  };

  Emit.on('window:notify', (event, notificationConfig) => {
    if (notifyInProgress) {
      queue.push(handleNotify.bind(this, event, notificationConfig));
    }
    handleNotify(event, notificationConfig);
  });

  Emit.on('window:notify:close', (event, _id) => {
    if (_.get(currentNotification, 'options._id') === _id) {
      currentNotification.close();
      currentNotification = null;
    }
  });

  browser.on('closed', () => {
    if (currentNotification) {
      currentNotification.close();
    }
  });
};
