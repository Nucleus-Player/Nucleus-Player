API.run(() => {
  GPM.mini.on('enable', () => {
    // DEV: When the mini player is enabled, fire the "window:mini" event to
    //      both the main process and the renderer process so they can respond
    require('electron').ipcRenderer.send('window:mini');
    require('electron').remote.getGlobal('Emit').browser.webContents.send('window:mini');
  });

  GPM.mini.on('disable', () => {
    // DEV: When the mini player is disabled, fire the "window:maxi" event to
    //      both the main process and the renderer process so they can respond
    require('electron').ipcRenderer.send('window:maxi');
    require('electron').remote.getGlobal('Emit').browser.webContents.send('window:maxi');
  });
});

Emit.on('window:mini', () => {
  document.body.classList.add('mini-player-mode');
});

Emit.on('window:maxi', () => {
  document.body.classList.remove('mini-player-mode');
});

// DEV: While in mini mode, this event will be sent from the main process when
//      the mini player is being resized.  We use the zoom to make the UI look
//      correct without having to worry about scaling CSS values ourselves
Emit.on('window:set:zoom', (event, i) => {
  API.run((zoomLevel) => {
    document.body.style.zoom = zoomLevel;
  }, (i * 100) + '%');
});
