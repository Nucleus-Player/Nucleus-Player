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
      browser.setAspectRatio(1);
      browser.setSize(Settings.get('miniWidth', 310), Settings.get('miniHeight', 310));
      browser.setMaximumSize(310, 310);
    }
  });

  Emit.on('window:maxi', () => {
    if (browser.miniMode) {
      browser.miniMode = false;
      browser.setMaximumSize(20000, 20000);
      browser.setAspectRatio(0);
      Emit.fire('window:set:zoom', 1);
      browser.setSize(Settings.get('width', 1200), Settings.get('height', 800));
    }
  });

  let fireEvent;
  browser.on('resize', () => {
    if (!browser.miniMode) {
      return;
    }
    if (fireEvent) {
      clearTimeout(fireEvent);
    }
    // DEV: We don't want this to continuously fire so we'll try make it fire only once
    fireEvent = setTimeout(() => {
      const dimensions = Math.max(browser.getSize()[0], browser.getSize()[1]);
      browser.setSize(dimensions, dimensions);
      Emit.fire('window:set:zoom', (dimensions - 10) / 300);
    }, 100);
  });
};
