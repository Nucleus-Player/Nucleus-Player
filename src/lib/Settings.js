'use strict';

const fs = require('fs');

class Settings {
  constructor() {
    const DIR = (process.env.APPDATA ||
      (process.platform === 'darwin' ? process.env.HOME + 'Library/Preferences' : '/var/local')) +
      '/Nucleus';
    this.PATH = DIR + '/.settings.json';
    this.data = {};
    this.lastSync = 0;

    if (fs.existsSync(this.PATH)) {
      this.data = JSON.parse(fs.readFileSync(this.PATH, 'utf8'));
    } else {
      fs.mkdirSync(DIR);
    }
  }

  set(key, value) {
    this.data[key] = value;
    this._save();
  }

  get(key, defaultValue) {
    return this.data[key] || defaultValue || null;
  }

  _save(force) {
    const now = (new Date).getTime();
    // During some save events (like resize) we need to queue the disk writes
    // so that we don't blast the disk every millisecond
    if (now - this.lastSync > 250 || force) {
      fs.writeFileSync(this.PATH, JSON.stringify(this.data));
    } else {
      if (this.saving) clearTimeout(this.saving);
      this.saving = setTimeout(this._save.bind(this), 275);
    }
    this.lastSync = now;
  }
}

module.exports = Settings;
