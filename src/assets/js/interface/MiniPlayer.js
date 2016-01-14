API.run(() => {
  GPM.mini.on('enable', () => {
    require('electron').ipcRenderer.send('window:mini');
  });

  GPM.mini.on('disable', () => {
    require('electron').ipcRenderer.send('window:maxi');
  });
});
