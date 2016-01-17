module.exports = (app) => {
  // DEV: These command line switches improve the in app experience
  app.commandLine.appendSwitch('enable-smooth-scrolling', '1');
  app.commandLine.appendSwitch('enable-overlay-scrollbar', '1');
};
