const eventEmitter = require('electron').ipcRenderer;
window.renderNotification = () => { // eslint-disable-line
  document.querySelector('.notification-title > span').textContent = window.NOTIFY_DATA.title;
  document.querySelector('.notification-body > span').textContent = window.NOTIFY_DATA.body;
  document.querySelector('.notification-image').addEventListener('load', () => {
    eventEmitter.send('window:notify:ready', {
      _id: window.NOTIFY_DATA._id,
      width: document.body.clientWidth,
      height: document.body.clientHeight,
    });
  });
  document.querySelector('.notification-image').src = window.NOTIFY_DATA.icon;
};
document.querySelector('.notification-close').addEventListener('click', () => {
  eventEmitter.send('window:notify:close', window.NOTIFY_DATA._id);
});
