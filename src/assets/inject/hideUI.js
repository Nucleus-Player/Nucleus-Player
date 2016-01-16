const _ = require('lodash');

const hide = (elementSelector) => {
  const nodeList = document.querySelectorAll(elementSelector);
  _.forEach(nodeList, (node) => {
    const element = node;
    element.style.display = 'none';
  });
};

const style = (elementSelector, styleObject) => {
  const nodeList = document.querySelectorAll(elementSelector);
  _.forEach(nodeList, (node) => {
    const element = node;
    _.forIn(styleObject, (value, key) => {
      element.style[key] = value;
    });
  });
};

// Top left account control buttons
hide('#material-one-right #gb > div > div > div:not(:last-child)');
style('#material-one-right #gb > div > div > div:last-child', { display: 'block', float: 'right' });
style('#material-one-right #gb > div > div', { display: 'block', float: 'right' });

// Built in mini player buttons
hide('.player-top-right-items > paper-icon-button');

// Settings options that won't work
hide('[data-action="upload-music"]');
hide('[data-action="help-and-feedback"]');
