'use strict';

module.exports = (mainWindow) => {
  const browser = mainWindow;
  browser.miniMode = false;

  Emit.on('window:mini', () => {
    if (!browser.miniMode) {
      if (browser.isMaximized()) {
        browser.unmaximize();
      }
      browser.miniMode = true;
      browser.setContentSize(Settings.get('miniWidth', 310), Settings.get('miniHeight', 310));
    }
  });

  Emit.on('window:maxi', () => {
    if (browser.miniMode) {
      browser.miniMode = false;
      browser.setSize(Settings.get('width', 1200), Settings.get('height', 800));
    }
  });
};
