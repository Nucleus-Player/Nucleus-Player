'use strict';

const electron = require('electron');
const globalShortcut = electron.globalShortcut;

module.exports = () => {
  // DEV: Media Playback Keys
  setInterval(() => {
    if (!globalShortcut.isRegistered('MediaPlayPause')) {
      Logger.info('Attempting to hook MediaPlayPause');
      globalShortcut.register('MediaPlayPause', Emit.fire.bind(Emit, 'playback:playpause'));
    }
    if (!globalShortcut.isRegistered('MediaPreviousTrack')) {
      Logger.info('Attempting to hook MediaPreviousTrack');
      globalShortcut.register('MediaPreviousTrack', Emit.fire.bind(Emit, 'playback:previoustrack'));
    }
    if (!globalShortcut.isRegistered('MediaNextTrack')) {
      Logger.info('Attempting to hook MediaNextTrack');
      globalShortcut.register('MediaNextTrack', Emit.fire.bind(Emit, 'playback:nexttrack'));
    }
    if (!globalShortcut.isRegistered('MediaStop')) {
      Logger.info('Attempting to hook MediaStop');
      globalShortcut.register('MediaStop', Emit.fire.bind(Emit, 'playback:stop'));
    }
  }, 1000);
};
