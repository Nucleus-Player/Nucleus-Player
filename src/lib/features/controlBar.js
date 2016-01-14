module.exports = (browser) => {
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
