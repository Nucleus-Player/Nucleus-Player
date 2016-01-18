'use strict';

const LastFM = require('../../LastFM');

module.exports = (browser) => {
  const Base = require('./Base.js')(browser);

  class LastFMAuth extends Base {
    init() {
      this.handled = false;

      return new Promise((resolve, reject) => {
        this.window.on('close', () => {
          if (!this.handled) {
            reject();
          }
        });

        this.lastfm = new LastFM();
        this.lastfm.auth().getToken().then((json) => {
          this.loadUrl(this.lastfm.getAuthUrl(json.token));
          this.window.webContents.once('did-stop-loading', () => {
            this.window.setSize(1200, 800);
            this.window.center();
            this.show();
          });
          const handler = this._handleUnknownAuthResponse.bind(this, json.token, resolve, reject);
          this.window.webContents.once('did-start-loading', () => {
            this.hide();
            this.window.webContents.once('did-stop-loading', handler);
          });
        });
      });
    }

    _handleUnknownAuthResponse(token, resolve, reject) {
      this.handled = true;
      this.close();
      this.lastfm.auth().getSession(token).then((data) => {
        resolve(data.session.key);
      }).catch((error) => {
        reject(error);
      });
    }
  }

  return LastFMAuth;
};
