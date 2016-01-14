const path = require('path');

module.exports = (browser) => {
  browser.setThumbarButtons([
    {
      icon: path.resolve(__dirname + '/../../../build/img/media-controls/previous.png'),
    },
    {
      icon: path.resolve(__dirname + '/../../../build/img/media-controls/play.png'),
    },
    {
      icon: path.resolve(__dirname + '/../../../build/img/media-controls/next.png'),
    },
  ]);
};
