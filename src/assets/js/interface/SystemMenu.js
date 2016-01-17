'use strict';

const Menu = require('electron').remote.Menu;

// DEV: This is the app menu that will appear on Macs and Linux
const template = [
  {
    label: 'View',
    submenu: [
      {
        label: 'Reload',
        accelerator: 'CmdOrCtrl+R',
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.reload();
          }
        },
      },
      {
        label: 'Toggle Full Screen',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Ctrl+Command+F';
          }
          return 'F11';
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
          }
        },
      },
      {
        label: 'Toggle Developer Tools',
        accelerator: (() => {
          if (process.platform === 'darwin') {
            return 'Alt+Command+I';
          }
          return 'Ctrl+Shift+I';
        })(),
        click: (item, focusedWindow) => {
          if (focusedWindow) {
            focusedWindow.toggleDevTools();
          }
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Toggle Mini Player',
        click: API.wrap(() => {
          GPM.mini.enable();
        }),
      },
    ],
  },
  {
    label: 'Window',
    role: 'window',
    submenu: [
      {
        label: 'Minimize',
        accelerator: 'CmdOrCtrl+M',
        role: 'minimize',
      },
      {
        label: 'Close',
        accelerator: 'CmdOrCtrl+W',
        role: 'close',
      },
    ],
  },
  {
    label: 'Playback',
    submenu: [
      {
        label: 'Play',
        accelerator: 'CmdOrCtrl+P',
        click: API.wrap(() => {
          GPM.playback.playPause();
        }),
      },
      {
        label: 'Previous Track',
        accelerator: 'CmdOrCtrl+Left',
        click: API.wrap(() => {
          GPM.playback.rewind();
        }),
      },
      {
        label: 'Next Track',
        accelerator: 'CmdOrCtrl+Right',
        click: API.wrap(() => {
          GPM.playback.forward();
        }),
      },
    ],
  },
  {
    label: 'Help',
    role: 'help',
    submenu: [
      {
        label: 'Learn More',
        click: () => { require('electron').shell.openExternal('http://electron.atom.io'); },
      },
    ],
  },
];

if (process.platform === 'darwin') {
  const name = require('electron').remote.app.getName();
  template.unshift({
    label: name,
    submenu: [
      {
        label: 'About ' + name,
        role: 'about',
      },
      {
        type: 'separator',
      },
      {
        label: 'Hide ' + name,
        accelerator: 'Command+H',
        role: 'hide',
      },
      {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        role: 'hideothers',
      },
      {
        label: 'Show All',
        role: 'unhide',
      },
      {
        type: 'separator',
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => { require('electron').remote.app.quit(); },
      },
    ],
  });
  // Window menu.
  template[3].submenu.push(
    {
      type: 'separator',
    },
    {
      label: 'Bring All to Front',
      role: 'front',
    }
  );
}


Menu.setApplicationMenu(Menu.buildFromTemplate(template));
