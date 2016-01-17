const path = require('path');
const os = require('os');
const semver = require('semver');

// Takes app as the second param
module.exports = (electron) => {
  const screenSize = electron.screen.getPrimaryDisplay().workAreaSize;
  const defaultHeight = screenSize.height * 3 / 4;
  const defaultWidth = screenSize.width * 3 / 4;


  const baseConfig = {
    width: Settings.get('width', defaultWidth),
    height: Settings.get('height', defaultHeight),
    x: Settings.get('X'),
    y: Settings.get('Y'),
    frame: false,
    icon: path.resolve('./build/img/main.png'),
    fullscreen: false,
    title: 'Nucleus Player',
    nodeIntegration: true,
  };

  // DEV: OS specific options
  if (process.platform === 'darwin') {
    if (semver.satisfies(os.release(), '>=14.0.0')) {
      baseConfig.frame = true;
      baseConfig.titleBarStyle = 'hidden-inset';
    }
  } else if (process.platform === 'win32') {
    baseConfig['web-preferences'] = {
      preload: path.resolve('./build/js/inject/windowsNotifications.js'),
    };
  }
  return baseConfig;
};
