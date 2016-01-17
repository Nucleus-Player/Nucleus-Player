// DEV: Make the ipcRenderer globally available

const ipcRenderer = require('electron').ipcRenderer;
global.Emit = ipcRenderer;
