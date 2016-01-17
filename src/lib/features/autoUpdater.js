'use strict';

const autoUpdater = require('electron').autoUpdater;

// DEV: This file works, kinda, at the moment.  Untested on mac, and auto closes on windows
// TODO: Implement an update status UI, possibly inside the settings popup
module.exports = () => {
  try {
    let check = true;

    if (process.platform !== 'darwin') {
      autoUpdater.setFeedURL('http://ut.samuel.ninja:6069/update/win/' + require('../../../package.json').version);
    }
    autoUpdater.checkForUpdates();
    setInterval(() => {
      if (check) {
        autoUpdater.checkForUpdates();
      }
    }, 120000);

    autoUpdater.on('checking-for-update', () => {
      check = false;
      Settings.set('thing1', 'CHECKING');
    });

    autoUpdater.on('update-available', () => {
      Settings.set('thing2', 'Update There');
    });

    autoUpdater.on('update-not-available', () => {
      Settings.set('thing3', 'No update');
    });

    autoUpdater.on('update-downloaded', () => {
      // TODO: Change this to ask before installing
      autoUpdater.quitAndInstall();
    });
  } catch (e) {
    Settings.set('thing5', 'error');
  }
};
