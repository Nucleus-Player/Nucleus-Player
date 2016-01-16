// Load initial setup handlers
require('./EventHandler');
require('./ExternalHandler');
const InternalAPI = require('./InternalAPI');
global.API = new InternalAPI();

API.run(() => {
  window.GPM = new window.GMusic(window);
  window.GPMTheme = new window.GMusicTheme();
});

require('./playback/manager');
require('./interface');

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
      document.body.removeAttribute('controls');
    });
  }
  API.run(() => {
    document.body.removeAttribute('ready');
  });
});
