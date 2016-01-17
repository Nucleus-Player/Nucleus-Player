// DEV: Handle playback events being sent from the main process
//      These are normally fired from the global keyboard hooks

Emit.on('playback:playpause', API.wrap(() => {
  GPM.playback.playPause();
}));

Emit.on('playback:previoustrack', API.wrap(() => {
  GPM.playback.rewind();
}));

Emit.on('playback:nexttrack', API.wrap(() => {
  GPM.playback.forward();
}));

API.run(() => {
  GPM.on('change:playback', (mode) => {
    const ipcRenderer = require('electron').ipcRenderer;
    switch (mode) {
      case window.GMusic.Playback.STOPPED:
        ipcRenderer.send('playback:isStopped');
        break;
      case window.GMusic.Playback.PAUSED:
        ipcRenderer.send('playback:isPaused');
        break;
      case window.GMusic.Playback.PLAYING:
      default:
        ipcRenderer.send('playback:isPlaying');
        break;
    }
  });
});
