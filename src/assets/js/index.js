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
