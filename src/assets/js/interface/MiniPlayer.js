const ipcRenderer = require('electron').ipcRenderer;

API.run(() => {
  GPM.mini.on('enable', () => {
    require('electron').ipcRenderer.send('window:mini');
    require('electron').remote.getGlobal('Emit').browser.webContents.send('window:mini');
  });

  GPM.mini.on('disable', () => {
    require('electron').ipcRenderer.send('window:maxi');
    require('electron').remote.getGlobal('Emit').browser.webContents.send('window:maxi');
  });
});

ipcRenderer.on('window:mini', () => {
  document.body.classList.add('mini-player-mode');
});

ipcRenderer.on('window:maxi', () => {
  document.body.classList.remove('mini-player-mode');
});

ipcRenderer.on('window:set:zoom', (event, i) => {
  API.run((zoomLevel) => {
    document.body.style.zoom = zoomLevel;
  }, (i * 100) + '%');
});
