var paramType = require('./paramType.js');
var serializer = require('./serializer.js');
var preparer = require('./preparer.js');
var printer = require('./printer.js');
var _ = require('lodash');

var nodes = [];

function add(node){
  nodes.push(node);
}

function remove(node){
  _.each(node.consumers, function(linkToConsumer){
    unlink(linkToConsumer);
  });

  _.each(node.params, function(param){
    if(param.type === paramType.LINK){
      unlink(param.value);
    }
  });

  removeFromArray(nodes, node);
}

function link(from, to, toParam){
  var link = {
    from: from,
    to: to,
    toParam: toParam,
    name: ''
  };

  from.consumers.push(link);
  to.params[toParam].value = link;
  to.params[toParam].type = paramType.LINK;
  return link;
}

function unlink(link){
  removeFromArray(link.from.consumers, link);
  clearParam(link.to, link.toParam);
}

function removeFromArray(array, element){
  array.splice(array.indexOf(element), 1);
}

function clearParam(node, param){
  node.params[param].value = undefined;
  node.params[param].type = paramType.EMPTY;    
}

function setParamConstant(node, param, value){
  node.params[param].value = value;
  node.params[param].type = paramType.CONSTANT;
}

function setParamInput(node, param, input){
  node.params[param].value = input;
  node.params[param].type = paramType.INPUT;
}

function serialize(){
  var net = preparer.prepareNetForSerialization();
  printer.printNet(net);

  var buffers = []

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

module.exports.add = add;
module.exports.remove = remove;
module.exports.link = link;
module.exports.unlink = unlink;
module.exports.setParamConstant = setParamConstant;
module.exports.setParamInput = setParamInput;
module.exports.clearParam = clearParam;
module.exports.nodes = nodes;
module.exports.serialize = serialize;



