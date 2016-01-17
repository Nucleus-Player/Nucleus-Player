module.exports = (mainWindow, app) => {
  // DEV: Load all of our feature files with the required params
  require('./keyboardShortcuts')(mainWindow);
  require('./miniPlayer')(mainWindow);
  require('./persistantWindowState')(mainWindow);
  require('./controlBar')(mainWindow);
  require('./autoUpdater')(app);
};
