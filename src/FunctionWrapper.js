'use strict';

var _ = require('lodash');
var Parser = require('./Parser');

/*
 a wrapper class for functions
 */
function FunctionWrapper(f) {
  if (typeof f !== 'function') {
    throw new TypeError('not a function: ' + f);
  }

  this.f = f;
}

/*
 gets the formal parameter list, which looks like [] or ['x', 'y']
 */
FunctionWrapper.prototype.getParams = function() {
  var es5Re = new RegExp(/^function \((.*)\)/);
  var fStr = this.f.toString();

  if (es5Re.test(fStr)) {
    // a hack to make an es5 anonymous function a valid exp.
    // see https://github.com/marijnh/acorn/issues/87
    fStr = '(' + fStr + ')';
  }

  var expTree = Parser.parse(fStr).body[0].expression;
  return _.map(expTree.params, function(obj) {
    return obj.name;
  });
};

FunctionWrapper.prototype.applyWithBinding = function(binding, thisArg) {
  var params = this.getParams();
  var args = _.map(params, function(key) {
    return binding[key];
  });

  return this.f.apply(thisArg, args);
};

module.exports = FunctionWrapper;

// console.log('eof');
