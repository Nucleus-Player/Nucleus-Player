'use strict';

const Logger = new (require('../src/lib/Logger'))();
let settingsGet;
let settingsSet;

describe('Logger', () => {
  beforeEach(() => {
    settingsSet = sinon.spy();

    global.Settings = {
      get: () => {
        return [];
      },
      set: settingsSet,
    };

    settingsGet = sinon.spy(Settings, 'get');
  });

  it('should log to the settings object correctly', () => {
    Logger.info('Fake Log');
    expect(settingsGet).to.have.been.calledWith('log');

    const args = settingsSet.args[0];
    expect(args[0]).to.be.equal('log');
    expect(args[1]).to.be.a('array');
  });

  it('should log the message correctly', () => {
    Logger.info('Fake Log');

    const args = settingsSet.args[0];
    expect(args[1].length).to.be.above(0);
    expect(args[1][0]).to.have.property('message');
    expect(args[1][0].message).to.be.equal('"Fake Log"');
  });

  it('should log objects to JSON', () => {
    Logger.info({ details: 'Fake Log' });

    const args = settingsSet.args[0];
    expect(args[1][0].message).to.be.equal('{"details":"Fake Log"}');
  });

  it('should log info with the correct type', () => {
    Logger.info({ details: 'Fake Log' });

    const args = settingsSet.args[0];
    expect(args[1][0].type).to.be.equal('INFO');
  });

  it('should log warnings with the correct type', () => {
    Logger.warning({ details: 'Fake Log' });

    const args = settingsSet.args[0];
    expect(args[1][0].type).to.be.equal('WARN');
  });

  it('should log errors with the correct type', () => {
    Logger.error({ details: 'Fake Log' });

    const args = settingsSet.args[0];
    expect(args[1][0].type).to.be.equal('ERROR');
  });
});
