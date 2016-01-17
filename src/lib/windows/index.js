'use strict';

module.exports = (browser) => {
  // DEV: Load the windows specific features
  require('./thumbbarButtons')(browser);
  require('./notifications')(browser);
};
