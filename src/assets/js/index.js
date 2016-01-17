// DEV: Load initial setup handlers
require('./EventHandler');
require('./ExternalHandler');
const InternalAPI = require('./InternalAPI');
global.API = new InternalAPI();

// DEV: Initialize all the GMusic libraries to the global scope
API.run(() => {
  window.GPM = new window.GMusic(window);
  window.GPMTheme = new window.GMusicTheme();
});

// DEV: Load in our helper code
require('./playback/manager');
require('./interface');

// DEV: Hacky workaround for the frameless container absorbing mouse events on
//      windows
document.querySelector('webview').addEventListener('mouseout', (e) => {
  if ((e.clientX >= 8 && e.clientX <= document.body.clientWidth - 8) &&
      (e.clientY >= 8 && e.clientY <= document.body.clientHeight - 8)) {
    // console.log('Rejected: ', e.clientX, e.clientY);
    // console.info('Base    :', document.body.clientWidth, document.body.clientHeight);
    API.run(() => {
      document.body.setAttribute('controls', true);
    });
  } else {
    API.run(() => {
      // TODO: Don't just remove it, it might have been there to begin with
      document.body.removeAttribute('controls');
    });
  }
  API.run(() => {
    document.body.removeAttribute('ready');
  });
});
