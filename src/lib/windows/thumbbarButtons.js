const path = require('path');

module.exports = (browser) => {
  const resetThumbbarButtons = (isPlaying) => {
    browser.setThumbarButtons([
      {
        tooltip: 'Previous Track',
        icon: path.resolve(__dirname + '/../../../build/img/media-controls/previous.png'),
        click: Emit.fire.bind(Emit, 'playback:previoustrack'),
      },
      {
        tooltip: (isPlaying ? 'Pause' : 'Play'),
        icon: path.resolve(__dirname + '/../../../build/img/media-controls/'
                                     + (isPlaying ? 'pause' : 'play') + '.png'),
        click: Emit.fire.bind(Emit, 'playback:playpause'),
      },
      {
        tooltip: 'Next Track',
        icon: path.resolve(__dirname + '/../../../build/img/media-controls/next.png'),
        click: Emit.fire.bind(Emit, 'playback:nexttrack'),
      },
    ]);
  };
  resetThumbbarButtons(false);

  Emit.on('playback:isStopped', resetThumbbarButtons.bind(this, false));
  Emit.on('playback:isPaused', resetThumbbarButtons.bind(this, false));
  Emit.on('playback:isPlaying', resetThumbbarButtons.bind(this, true));
};
