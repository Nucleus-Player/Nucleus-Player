'use strict';

const md5 = require('md5');

module.exports = class WindowManager {
  constructor() {
    this.windows = {};
  }

  getKey() {
    let key;
    do {
      key = md5(process.hrtime());
    } while (this.windows[key]);
    return key;
  }

  add(key, window) {
    this.windows[key] = window;
    window.on('closed', () => {
      this.remove(key);
    });
  }

  get(key) {
    return this.windows[key];
  }

  remove(key) {
    delete this.windows[key];
  }
};
