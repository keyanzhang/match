'use strict';

jest.autoMockOff();

var FunctionWrapper = require('../FunctionWrapper');
var _ = require('lodash');

var funcs = [
  [ function() {return 42;},
    [],
    {x: 2350},
    42
  ],
  [
    function(x) {return x;},
    ['x'],
    {
      y: 255,
      x: 12
    },
    12
  ],
  [
    function(x, y) {return x - y;},
    ['x', 'y'],
    {
      y: 12,
      x: 15
    },
    3
  ],
  [
    function(x,y     , z) {return x - y - z;},
    ['x', 'y', 'z'],
    {
      z: 25,
      y: 12,
      x: 4
    },
    4 - 12 - 25
  ],
  [
    (x) => 2,
    ['x'],
    {},
    2
  ],
  [
    ()=> 2,
    [],
    {},
    2
  ],
  [
    ()=> {return 12;},
    [],
    {x: 256},
    12
  ],
  [
    (x,    y)    => x - y,
    ['x', 'y'],
    {y: 255,
     x: 12},
    12 - 255
  ],
  [
    (x)=> {return 12;},
    ['x'],
    {},
    12
  ],
  [ function foo() {return 42;},
    [],
    {x: 2350},
    42
  ],
  [
    function bar(x) {return Math.sqrt(x);},
    ['x'],
    {
      y: 255,
      x: 16
    },
    4
  ],
  [
    function baz(x, y) {return x + 2 * y;},
    ['x', 'y'],
    {
      y: 12,
      x: 15
    },
    15 + 24
  ],
  [
    function spaces(m,  x,y     , z, n) {return x - y - z;},
    ['m', 'x', 'y', 'z', 'n'],
    {
      z: 25,
      y: 12,
      m: 120,
      x: 4
    },
    4 - 12 - 25
  ],
];

_.forEach(funcs, function(x, idx) {
  describe('.getParams() test ' + idx, function() {
    it('gets the parameter list of an ES5/ES6 function exp', function() {
      expect((new FunctionWrapper(x[0])).getParams()).toEqual(x[1]);
    });
  });
});

_.forEach(funcs, function(x, idx) {
  describe('.applyWithBinding() test ' + idx, function() {
    it('apply bindings to a function', function() {
      expect((new FunctionWrapper(x[0])).applyWithBinding(x[2])).toEqual(x[3]);
    });
  });
});




// console.log('eof');
