'use strict';

module.exports = (browser) => {
  // DEV: Handle the control bar events and perform the appropriate action
  Emit.on('window:minimize', (event, ID) => {
    if (ID) {
      WindowManager.get(ID).minimize();
    } else {
      browser.minimize();
    }
  });

  Emit.on('window:maximize', (event, ID) => {
    let win;
    if (ID) {
      win = WindowManager.get(ID);
    } else {
      win = browser;
    }
    if (win.isMaximized()) {
      win.unmaximize();
    } else {
      win.maximize();
    }
  });

  Emit.on('window:close', (event, ID) => {
    if (ID) {
      WindowManager.get(ID).close();
    } else {
      browser.close();
    }
  });
};
