const _ = require('lodash');
const webview = document.querySelector('webview');

// DEV: This is a wrapper around the "webview.executeJavaScript" method that allows
//      you to pass an actual Javascript function in instead of a string.  This allows
//      the linter to work correctly along with our babel logic

class InternalAPI {
  constructor() {
    this.queue = [];
    this.ready = false;
    webview.style.opacity = 0;

    webview.addEventListener('did-start-loading', () => {
      this.ready = false;
    });

    // DEV: When the webview is ready, fire any executes waiting in the queue and
    //      hide the loader
    webview.addEventListener('did-stop-loading', () => {
      this.ready = true;
      webview.style.opacity = 1;
      document.querySelector('.loader').style.opacity = 0;
      _.forEach(this.queue, (item) => {
        this.exec(item);
      });
    });
  }

  exec(string) {
    if (!this.ready) {
      this.queue.push(string);
      return;
    }
    webview.executeJavaScript(string);
  }

  run(fn) {
    let fnString = fn.toString();
    fnString = '(' + fnString + ').apply(window, ' +
                JSON.stringify(Array.prototype.slice.call(arguments, 1)) + ')';
    this.exec(fnString);
  }

  wrap(fn, runInScope) {
    return () => {
      if (runInScope && _.isFunction(runInScope)) {
        runInScope.apply(arguments);
      }
      this.run(fn);
    };
  }
}

module.exports = InternalAPI;
