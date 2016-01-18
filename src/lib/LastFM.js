'use strict';

const LastFmNode = require('lastfm').LastFmNode;
const API_KEY = '';
const API_SECRET = '';

module.exports = class LastFM {
  constructor() {
    this.lastfm = new LastFmNode({
      api_key: API_KEY,    // sign-up for a key at http://www.last.fm/api
      secret: API_SECRET,
      useragent: 'nucleus-player',
    });
  }

  auth() {
    return {
      getToken: this._promiseRequest.bind(this, 'auth.getToken'),
      getSession: (token) => {
        return this._promiseRequest('auth.getSession', {
          token,
        });
      },
    };
  }

  getAuthUrl(token) {
    return 'http://www.last.fm/api/auth?api_key=' + API_KEY + '&token=' + token;
  }

  _promiseRequest(method, options) {
    return new Promise((resolve, reject) => {
      const request = this.lastfm.request(method, options || {});
      request.on('success', (json) => {
        resolve(json);
      });
      request.on('error', (error) => {
        reject(error);
      });
    });
  }
};
