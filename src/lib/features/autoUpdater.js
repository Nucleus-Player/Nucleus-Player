'use strict';

const autoUpdater = require('electron').autoUpdater;

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
      autoUpdater.quitAndInstall();
    });
  } catch (e) {
    Settings.set('thing5', 'error');
  }
};
