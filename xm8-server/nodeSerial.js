var binstruct = require('binstruct');
var _ = require('lodash');
var matrix = require('./core/matrix.js');
var matrixPreparer = require('./core/matrixPreparer.js');
var matrixSerializer = require('./core/matrixSerializer.js');
var matrixPrinter = require('./core/matrixPrinter.js');
var paramType = require('./core/paramType.js');
var nodes = require('./core/nodeFactory.js');

function test(){
  var output2 = nodes.output(undefined, [5, paramType.CONSTANT]);
  matrix.add(output2);
  var output5 = nodes.output(undefined, [2, paramType.CONSTANT]);
  matrix.add(output5);
  var invert = nodes.invert(undefined);
  matrix.add(invert);
  var lfo = nodes.lfoPulse([0, paramType.INPUT], [1, paramType.CONSTANT], [0, paramType.CONSTANT], [32000, paramType.CONSTANT], [-32000, paramType.CONSTANT]);
  matrix.add(lfo);

  matrix.link(lfo, output5, 0);
  matrix.link(lfo, invert, 0);
  var link = matrix.link(invert, output2, 0);


  var net = matrixPreparer.prepareNetForSerialization();
  matrixPrinter.printNet(net);
}

test();
