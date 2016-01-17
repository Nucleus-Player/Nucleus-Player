// DEV: We need to wait for the page to load sufficiently before we can load
//      gmusic.js and its child libraries
const waitForExternal = setInterval(() => {
  if (document.querySelector('#material-vslider')) {
    clearInterval(waitForExternal);
    require('../external.js');
    // DEV: Polyfill the notification API on windows
    if (process.platform === 'win32') {
      require('./windowsNotifications');
    }
    require('./desktopSettingsTrigger');
    require('./hideUI');
  }
}, 10);
