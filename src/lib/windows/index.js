'use strict';

module.exports = (browser) => {
  require('./thumbbarButtons')(browser);
  require('./notifications')(browser);
};
