// DEV: Load initial setup handlers
require('./EventHandler');
const InternalAPI = require('./InternalAPI');
global.API = new InternalAPI();

require('./interface/ControlBar');

window.goTo = (url) => {
  document.querySelector('webview').src = url;
};
