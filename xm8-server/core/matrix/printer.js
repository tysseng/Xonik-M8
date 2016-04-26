var paramType = require('../../shared/matrix/ParameterTypes.js');
var nodeType = require('./nodeType.js');
var _ = require('lodash');

function getNodeTypeStr(type){
  switch(type){
    case nodeType.LFO_PULSE.id:
      return "NODE_LFO_PULSE";
    case nodeType.OUTPUT.id:
      return "NODE_OUTPUT";
    case nodeType.INVERT.id:
      return "NODE_INVERT";
    default:
      return "UNKNOWN (" + type + ")";
  }
}

function getParamTypeStr(type){
  switch(type){
    case paramType.CONSTANT.id:
      return "CONSTANT";
    case paramType.LINK.id:
      return "LINK";
    case paramType.INPUT.id:
      return "INPUT";
    case paramType.UNUSED.id:
      return "EMPTY";
    default:
      return "UNKNOWN (" + type + ")";
  }
}

function isComplete(node){
  var isComplete = true;
  _.each(node.params, function(param){
    if(param.type === paramType.UNUSED.id) isComplete = false;
  });
  return isComplete;
}

function printNode(node){

  var type = getNodeTypeStr(node.type);
  var incomplete = !isComplete(node) ? ", incomplete)" : "";
  var reachable = node.reachable ? ", reachable" : ", unreachable";
  var pos = ", pos " + node.nodePos;

  console.log("Node: " + type + reachable + incomplete + pos);
  
  _.each(node.params, function(param){
    var parType = getParamTypeStr(param.type);
    var parValue = (param.type === paramType.LINK ?  "from " + getNodeTypeStr(param.value.from.type) : param.value);
    console.log("Param: " + parType + ' ' + parValue + " (" + param.label + ")" + ", pos " + param.nodePos);
  });
  
  _.each(node.consumers, function(consumer){
    console.log("Consumed by: " + getNodeTypeStr(consumer.to.type));
  });  
  
  console.log("");
}

function printNet(preparedNet){
  console.log("");
  console.log("Constants:");
  console.log("================");
  console.log(preparedNet.constants);
  console.log("");
  console.log("Nodes:");
  console.log("================");

  _.each(preparedNet.nodes, function(node){
    printNode(node);
  });
}

module.exports.printNet = printNet;