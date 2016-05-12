var _ = require('lodash');
var matrix = require('./matrix.js');
var serializer = require('./serializer.js');
var preparer = require('./preparer.js');
var printer = require('./printer.js');
//var spi = require('../spi/spi-fd.js');


function sendMatrix(){
  if(!preparer.isNetValid()){
    console.log("Matrix has validation errors, synth voices not updated");
    return;
  }
  var buffers = serialize();/*
  _.each(buffers, function(buffer){
    spi.write(buffer);
    console.log(buffer);
  });*/
}

function save(){
  // TODO - IMPLEMENT! Remember to save input values (potmeter values) as well
}

function load(){
  // TODO - implement!
}

function serialize(){
  var net = preparer.prepareNetForSerialization();
  printer.printNet(net);

  var buffers = [];

  // add all constants and constant lengths
  for(var i = 0; i<net.constants.length; i++){
    var serializedConstant = serializer.serializeConstant(i, net.constants[i]);
    buffers.push(serializedConstant);
  }
  buffers.push(serializer.serializeConstantsCount(net.constants));

  // add all nodes and node array length
  _.each(net.nodes, function(node){
    var serializedNode = serializer.serializeNode(node);
    buffers.push(serializedNode);
  });
  buffers.push(serializer.serializeNodeCount(net.nodes));

  return buffers;
}

module.exports.sendMatrix = sendMatrix;
