import { paramTypesById } from '../../shared/graph/ParameterTypes';
import { nodeTypesById } from '../../shared/graph/NodeTypes';
var _ = require('lodash');


function getNodeTypeStr(type){
  switch(type){
    case nodeTypesById.LFO_PULSE.id:
      return "NODE_LFO_PULSE";
    case nodeTypesById.OUTPUT.id:
      return "NODE_OUTPUT";
    case nodeTypesById.INVERT.id:
      return "NODE_INVERT";
    default:
      return "UNKNOWN (" + type + ")";
  }
}

function getParamTypeStr(type){
  switch(type){
    case paramTypesById.CONSTANT.id:
      return "CONSTANT";
    case paramTypesById.LINK.id:
      return "LINK";
    case paramTypesById.INPUT.id:
      return "INPUT";
    case paramTypesById.UNUSED.id:
      return "EMPTY";
    default:
      return "UNKNOWN (" + type + ")";
  }
}

function isComplete(node){
  var isComplete = true;
  _.each(node.params, function(param){
    if(param.type === paramTypesById.UNUSED.id) isComplete = false;
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
    var parValue = (param.type === paramTypesById.LINK.id ?  "from " + getNodeTypeStr(param.value.from.type) : param.value);
    var parLabel = param.label ? " (" + param.label + ")" : "";
    console.log("Param: " + parType + ' ' + parValue + parLabel + ", pos " + param.nodePos);
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