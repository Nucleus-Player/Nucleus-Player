'use strict';

const emitterFn = require('../src/lib/Emitter');
let emitter;
let spy;

describe('Emitter', () => {
  beforeEach(() => {
    spy = sinon.spy();
    emitter = emitterFn({
      webContents: {
        send: spy,
      },
    });
  });

  it('should pass through fire events to the webContents', () => {
    emitter.fire('random:event', 'foo');
    expect(spy).to.have.been.calledWith('random:event', 'foo');
  });
});
