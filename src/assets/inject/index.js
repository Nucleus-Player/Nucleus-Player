const waitForExternal = setInterval(() => {
  if (document.querySelector('#material-vslider')) {
    clearInterval(waitForExternal);
    require('../external.js');
  }
}, 10);
