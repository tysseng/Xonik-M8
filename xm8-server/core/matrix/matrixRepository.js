var _ = require('lodash');
import store from '../../state/store.js';
var serializer = require('./serializer.js');
var preparer = require('./preparer.js');
var printer = require('./printer.js');
var commands = require('./commands.js');

let spi;

if(true){
  spi = require('../spi/spi-fd.js');
} else {
  spi = {
    write: buffer => {
      console.log("Writing to mock SPI: ")
      console.log(buffer);
    }
  }
}



// auto-update voices whenever state changes
// TODO: listen to only matrix changes!
store.subscribe(
  () => {
    if(store.getState().matrix.get('shouldAutoUpdate')){
      sendMatrix(); 
    }
  }
);

function sendMatrix(){
  if(!preparer.isNetValid()){
    console.log("Matrix has validation errors, synth voices not updated");
    return {updated: false, message: "Matrix has validation errors, synth voices not updated"};
  }
  
  spi.write(commands.stop);

  var buffers = serialize();
  _.each(buffers, function(buffer){
    spi.write(buffer);
  });  
  spi.write(commands.restart);

  return {updated: true, message: "Synth voices updated"};  
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
