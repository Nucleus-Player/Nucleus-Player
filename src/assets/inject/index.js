const waitForExternal = setInterval(() => {
  if (document.querySelector('#material-vslider')) {
    clearInterval(waitForExternal);
    require('../external.js');
    if (process.platform === 'win32') {
      require('./windowsNotifications');
    }
    require('./hideUI');
  }
}, 10);
