'use strict';

module.exports = (browser) => {
  let currentSize = browser.getSize();

  Emit.on('window:mini', () => {
    currentSize = browser.getSize();
    browser.setSize(300, 300);
  });

  Emit.on('window:maxi', () => {
    browser.setSize(currentSize[0], currentSize[1]);
  });
};
