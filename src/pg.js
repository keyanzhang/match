'use strict';

var acorn = require('acorn');
var _ = require('lodash');

var acornOptions = {
  ecmaVersion: 6,
  sourceType: 'script',
  allowReserved: 'false',
};

var parseExample = _.map([
  'null',
  'undefined',
  'true',
  'false',
  '12',
  '2.45',
  '-12.8',
  '1e+42',
  '"hello world"',
  '(function(x) {return x;})', // need to be wrapped in `()`
  '_',
  '[]',
  '[1, 2, 3]',
  '[a, 2, y]',
  '[a, ...b]',
  '',
], function(x) {
  var tryBody = acorn.parse(x, acornOptions).body[0];
  return tryBody ? tryBody.expression : tryBody; // the else case is for ''
});

_.map(parseExample, function(x, i) {
  console.log(i, x);
});

function runIter(ast, value) {
  
}

// []
function genPreds(ast) {
  if (typeof ast === 'undefined') {
    return [
      function(x) {
        return(typeof ast === 'undefined');
      }
    ];
  }

  var type = ast.body[0].expression.type;
  var litValue;
  var idName;
  var preds;

  var currentExp = ast.body[0].expression;
  
}

function constTrue(x) {
  return true;
}

function genNoBinding(x) {
  return {};
}

function genBinding(variable) {
  if (typeof variable !== 'string') {
    variable = variable.toString();
  }

  return function(x) {
    var binding = {};
    binding[variable] = x;
    return binding;
  };
}

function genLoop(exp) {
  var type = exp.type;
  var litValue;
  var idName;
  var preds;
  
  switch (type) {
    case 'Literal': // null, true, false, 12, 2.45, 1e+42, 'hello world'
      litValue = exp.value;
      return [
        genNoBinding,
        function(x) {
          return x === litValue;
        }
      ];
      break;
    case 'Identifier': // undefined, x, y, foo
      idName = exp.name;
      if (idName === 'undefined') {
        return [
          genNoBinding,
          function(x) {
            return typeof x === 'undefined';
          }
        ];
      }
      else if (idName === '_') { // @TODO
        return [
          genNoBinding,
          constTrue
        ];
      }
      else { // generate bindings here
        return [
          {},
          constTrue
        ];
      }
      break;
    case 'ArrayExpression':
      preds = [ // type checking first
        {},
        function(x) {
          return _.isArray(x);
        }
      ];
      return preds.concat(_.map(exp.elements, genLoop)); // @TOFIX
      break;
    case 'FunctionExpression': // @TODO guards
      break;
    case 'UnaryExpression': // -20.2
      return [
        {},
        function(x) {
          return x === -1 * exp.argument.value;
        }
      ];
      break;
    default:
      throw new Error('what? ' + exp);
      break;
  }
  
}



// console.log('eof');
