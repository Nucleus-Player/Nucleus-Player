const _ = require('lodash');
const webview = document.querySelector('webview');

class InternalAPI {
  constructor() {
    this.queue = [];
    this.ready = false;
    webview.style.opacity = 0;

    webview.addEventListener('did-start-loading', () => {
      this.ready = false;
    });

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
