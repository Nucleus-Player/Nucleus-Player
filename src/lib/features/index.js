module.exports = (mainWindow) => {
  require('./keyboardShortcuts')(mainWindow);
  require('./miniPlayer')(mainWindow);
  require('./persistantWindowState')(mainWindow);
  require('./controlBar')(mainWindow);
};
