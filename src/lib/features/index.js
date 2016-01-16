module.exports = (mainWindow, app) => {
  require('./keyboardShortcuts')(mainWindow);
  require('./miniPlayer')(mainWindow);
  require('./persistantWindowState')(mainWindow);
  require('./controlBar')(mainWindow);
  require('./autoUpdater')(app);
};
