'use strict';

var _ = require('lodash');
var Parser = require('./Parser');


/**
 * a wrapper class for functions
 * @param {Function} f
 * @throws {TypeError} - `f` must be a function
 */
function FunctionWrapper(f) {
  if (typeof f !== 'function') {
    throw new TypeError('not a function: ' + f);
  }

  this.f = f;
}


/**
 * get the formal parameter list, which looks like [] or ['x', 'y']
 * @returns {String[]} 
 */
FunctionWrapper.prototype.getParams = function() {
  var es5Re = new RegExp(/^function \((.*)\)/);
  var fStr = this.f.toString();
  
  if (es5Re.test(fStr)) {
    // a hack to make an es5 anonymous function a valid exp.
    // see https://github.com/marijnh/acorn/issues/87
    fStr = '(' + fStr + ')';
  }

  var body = Parser.parse(fStr).body[0];
  var expTree = body.expression || body; // to support named functions.
  // `(function(x) {})` is an ExpressionStatement;
  // `function foo(x) {}` is a FunctionDeclaration
  
  return _.map(expTree.params, function(obj) {
    return obj.name;
  });
};


/**
 * apply the function with bindings (by rearranging the order of arguments)
 * @param {Object} binding
 * @param {} thisArg - optional
 * @returns {} - the result of function application
 */
FunctionWrapper.prototype.applyWithBinding = function(binding, thisArg) {
  var params = this.getParams();
  var args = _.map(params, function(key) {
    return binding[key];
  });

  return this.f.apply(thisArg, args);
};

module.exports = FunctionWrapper;
