'use strict';

module.exports = (browser) => {
  const saveState = () => {
    const size = browser.getSize();
    const position = browser.getPosition();

    if (!browser.miniMode) {
      Settings.set('width', size[0]);
      Settings.set('height', size[1]);
      Settings.set('X', position[0]);
      Settings.set('Y', position[1]);
    } else {
      Settings.set('miniWidth', size[0]);
      Settings.set('miniHeight', size[1]);
      Settings.set('miniX', position[0]);
      Settings.set('miniY', position[1]);
    }
  };

  browser.on('resize', saveState);
  browser.on('move', saveState);
  saveState();
  // Force the settings to save as the browser closes
  browser.on('close', Settings._save.bind(Settings, true));
};
