module.exports = (browser) => {
  // DEV: Handle the control bar events and perform the appropriate action
  Emit.on('window:minimize', () => {
    browser.minimize();
  });

  Emit.on('window:maximize', () => {
    if (browser.isMaximized()) {
      browser.unmaximize();
    } else {
      browser.maximize();
    }
  });

  Emit.on('window:close', () => {
    browser.close();
  });
};
