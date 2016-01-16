const ipcRenderer = require('electron').ipcRenderer;

const settingsTrigger = document.createElement('a');
settingsTrigger.setAttribute('data-type', 'desktopsettings');
settingsTrigger.setAttribute('class', 'nav-item-container tooltip');
settingsTrigger.setAttribute('href', '');
settingsTrigger.setAttribute('no-focus', '');
settingsTrigger.innerHTML = '<iron-icon icon="settings" alt="" class="x-scope iron-icon-1"></iron-icon>Desktop settings'; // eslint-disable-line
settingsTrigger.addEventListener('click', (e) => {
  ipcRenderer.send('window:settings:show');
  e.preventDefault();
  e.stopPropagation();
  return false;
});
document.querySelectorAll('.nav-section.material')[0]
  .insertBefore(settingsTrigger, document.querySelectorAll('.nav-section.material > a')[2]);
