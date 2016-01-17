'use strict';

const electron = require('electron');
const globalShortcut = electron.globalShortcut;

module.exports = () => {
  // DEV: Media Playback Keys
  setInterval(() => {
    if (!globalShortcut.isRegistered('MediaPlayPause')) {
      globalShortcut.register('MediaPlayPause', Emit.fire.bind(Emit, 'playback:playpause'));
    }
    if (!globalShortcut.isRegistered('MediaPreviousTrack')) {
      globalShortcut.register('MediaPreviousTrack', Emit.fire.bind(Emit, 'playback:previoustrack'));
    }
    if (!globalShortcut.isRegistered('MediaNextTrack')) {
      globalShortcut.register('MediaNextTrack', Emit.fire.bind(Emit, 'playback:nexttrack'));
    }
    if (!globalShortcut.isRegistered('MediaStop')) {
      globalShortcut.register('MediaStop', Emit.fire.bind(Emit, 'playback:stop'));
    }
  }, 1000);
};
