'use strict';

var _ = require('lodash');

function match(x, table) {
  var patternStr;
  var binding;
  var callbackWrap;
  
  for (patternStr in table) { // @TODO: the order is not reliable
    binding = patternToFunc(patternStr)(x);
    if (binding) {
      callbackWrap = new FunctionWrapper(table[patternStr]);
      break; // first come first serve
    }
  }
  
  if (binding) {
    return callbackWrap.feed(binding, null);
  }
  else {
    throw new Error('match failed.');
  }
}




// function reverse(x) {
//   return match(x, {
//     '[]': () => [],
//     '[a, ...b]': (a, b) => {
//       return this(b).concat([a]);
//     }
//   });
// }


/*
 '[]': function() {}
 '[a]': function(a) {}
 '[a, ...d]': function(a, d) {}
 '[a, 3, 2]': function(a) {}
*/
function patternToFunc(patternStr) {
  var binding = {};
  var args = [];
  
  return function(val) {
    
  };
}

function allPass(data, preds) {
  var i;
  for (i = 0; i < preds.length; i++) {
    if (!preds[i](data)) { // side effects could happen here
      return false;
    }
  }

  return true;
}



// console.log('eof');
