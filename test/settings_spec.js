'use strict';

const _ = require('lodash');
const fs = require('fs');

const Settings = new (require('../src/lib/Settings'))('test', true);
const complexObject = {
  arr: [{
    nested: [],
  }],
};

describe('Settings', () => {
  it('should return null if data is not found and no default is provided', () => {
    expect(Settings.get('foo')).to.be.equal(null);
  });

  it('should return default if data is not found and default is provided', () => {
    expect(Settings.get('music', 'is_bad')).to.be.equal('is_bad');
  });

  it('should return a previously saved value if it exists', () => {
    Settings.set('music', 'is_good');
    expect(Settings.get('music')).to.be.equal('is_good');
  });

  it('should return a complex object value if it exists', () => {
    Settings.set('music_data', complexObject);
    expect(Settings.get('music_data')).to.be.equal(complexObject);
  });

  it('should save the new Settings object immediately', () => {
    const spy = sinon.spy(Settings, '_save');
    Settings.set('music_info', 'It was good :)');
    expect(spy).to.have.been.calledWith();
  });

  it('should combine multiple sets into a single filesystem write', (done) => {
    const initalJSON = fs.readFileSync(Settings.PATH, 'utf8');
    _.forEach(_.range(100), (n) => {
      Settings.set(n, _.range(n));
    });
    const afterJSON = fs.readFileSync(Settings.PATH, 'utf8');
    expect(initalJSON).to.be.equal(afterJSON);

    setTimeout(() => {
      const laterJSON = fs.readFileSync(Settings.PATH, 'utf8');
      expect(initalJSON).to.not.be.equal(laterJSON);
      expect(afterJSON).to.not.be.equal(laterJSON);
      done();
    }, 400);
  });
});
