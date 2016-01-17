'use strict';

const fs = require('fs');
const mkdirp = require('mkdirp');

// DEV: A settings class that stored any data that can be stored as JSON
class Settings {
  constructor(jsonPrefix, wipeOldData) {
    const DIR = (process.env.APPDATA ||
      (process.platform === 'darwin' ? process.env.HOME + '/Library/Preferences' : '/var/local')) +
      '/Nucleus';
    this.PATH = DIR + '/' + (jsonPrefix || '') + '.settings.json';
    this.data = {};
    this.lastSync = 0;

    if (fs.existsSync(this.PATH) && !wipeOldData) {
      this.data = JSON.parse(fs.readFileSync(this.PATH, 'utf8'));
    } else {
      mkdirp(DIR);
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
