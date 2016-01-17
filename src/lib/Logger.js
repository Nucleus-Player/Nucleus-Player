'use strict';

class Logger {
  _write(type, message) {
    const current = Settings.get('log', []);
    current.push({
      date: new Date(),
      type,
      message,
    });
    Settings.set('log', current);
  }

  info(message) {
    this._write('INFO', JSON.stringify(message));
  }

  warning(message) {
    this._write('WARN', JSON.stringify(message));
  }

  error(message) {
    this._write('ERROR', JSON.stringify(message));
  }
}

module.exports = Logger;
