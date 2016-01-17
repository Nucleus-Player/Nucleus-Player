'use strict';

const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');

// chai.should();
global.expect = chai.expect;
chai.use(sinonChai);

global.sinon = sinon;
