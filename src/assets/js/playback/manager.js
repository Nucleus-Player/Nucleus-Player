Emit.on('playback:playpause', API.wrap(() => {
  GPM.playback.playPause();
}));

Emit.on('playback:previoustrack', API.wrap(() => {
  GPM.playback.rewind();
}));

Emit.on('playback:nexttrack', API.wrap(() => {
  GPM.playback.forward();
}));
