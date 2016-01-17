const ipcRenderer = require('electron').ipcRenderer;

// DEV: Create a menu element with the same structure that the existing ones use
const settingsTrigger = document.createElement('a');
settingsTrigger.setAttribute('data-type', 'desktopsettings');
settingsTrigger.setAttribute('class', 'nav-item-container tooltip');
settingsTrigger.setAttribute('href', '');
settingsTrigger.setAttribute('no-focus', '');
settingsTrigger.innerHTML = '<iron-icon icon="settings" alt="" class="x-scope iron-icon-1"></iron-icon>Desktop settings'; // eslint-disable-line
settingsTrigger.addEventListener('click', (e) => {
  // DEV: When the menu element is clicked, fire an event to the main process
  ipcRenderer.send('window:settings:show');
  e.preventDefault();
  e.stopPropagation();
  return false;
});
// DEV: Insert out new element before the third one that already exists
//      This places it right beneath the existing "Settings" button
document.querySelectorAll('.nav-section.material')[0]
  .insertBefore(settingsTrigger, document.querySelectorAll('.nav-section.material > a')[2]);
