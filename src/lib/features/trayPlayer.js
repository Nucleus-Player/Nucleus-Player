const electron = require('electron');
const Menu = electron.Menu;
const Tray = electron.Tray;
const path = require('path');

module.exports = () => {
  // console.log(path.resolve('./build/img/main'));
  console.log(path.resolve(__dirname + '/../../../build/img/main.png'));
  appIcon = new Tray(path.resolve(__dirname + '/../../../build/img/main.png'));
  var contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true },
    { label: 'Item4', type: 'radio' }
  ]);
  appIcon.setToolTip('This is my application.');
  appIcon.setContextMenu(contextMenu);
};
