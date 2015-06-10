'use strict';

var acorn = require('acorn');

var acornOptions = {
  ecmaVersion: 6,
  sourceType: 'script',
  allowReserved: 'false',
};


/**
 * parse the string
 * @param {String} x
 * @returns {Object} - the AST
 * @throws {TypeError} - `x` must be a string
 */
function parse(x) {
  if (typeof x !== 'string') {
    throw new TypeError('not a string: ' + x);
  }
  
  return acorn.parse(x, acornOptions);
}

module.exports = {
  parse: parse
};

// console.log('eof');
