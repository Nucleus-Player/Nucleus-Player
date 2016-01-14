module.exports = (app) => {
  app.commandLine.appendSwitch('enable-smooth-scrolling', '1');
  app.commandLine.appendSwitch('enable-overlay-scrollbar', '1');
};
