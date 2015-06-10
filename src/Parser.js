'use strict';

var acorn = require('acorn');

var acornOptions = {
  ecmaVersion: 6,
  sourceType: 'script',
  allowReserved: 'false',
};

module.exports = {
  parse: function(x) {
    return acorn.parse(x, acornOptions);
  }
};

// console.log('eof');
