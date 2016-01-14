'use strict';

module.exports = (browser) => {
  const saveState = () => {
    const size = browser.getSize();
    const position = browser.getPosition();

    Settings.set('width', size[0]);
    Settings.set('height', size[1]);
    Settings.set('X', position[0]);
    Settings.set('Y', position[1]);
  };

  browser.on('resize', saveState);
  browser.on('move', saveState);
  // Force the settings to save as the browser closes
  browser.on('close', Settings._save.bind(Settings, true));
};
