import _ from 'lodash';
import paramTypes from '../../shared/matrix/ParameterTypes.js';
import nodeTypes from '../../shared/matrix/NodeTypes.js';
import config from '../../shared/config.js';
import store from '../state/store.js';

let paramType = paramTypes.map;
let nodeType = nodeTypes.map;
let nodeTypesIdMap = nodeTypes.idMap


const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

const addMissingFieldsWithDefaults = (nodes) => {
  _.each(nodes, function(node){
    node.nodePos = -1;
    node.reachable = false;
    _.each(nodes.params, function(param){
      param.nodePos = -1;
    });
    setParamsInUse(node);
  });
}

const setParamsInUse = (node) => {
  let typedef = nodeTypesIdMap[node.type];
  if(typedef.hasVariableParamsLength){
    let paramsInUse = 0;

    // used parameters must be sequential, e.g. without any gap. (TODO: improve this later, allow gaps?)
    for(let i = 0; i<node.params.length; i++){
      let param = node.params[paramsInUse];
      if(param.type === paramType.UNUSED.id || param.type == ''){
        break;
      }
      paramsInUse++;
    }
    
    node.paramsInUse = paramsInUse;
  } else {
    node.paramsInUse = typedef.params.length;
  }

}

const convertLinkValuesToRefs = (nodes) => {
  _.each(nodes, node => {
    _.each(node.consumers, consumer => {
      consumer.from = nodes[consumer.from];
      consumer.to = nodes[consumer.to];
    });
    _.each(node.params, param => {
      if(isLink(param.type)){
        param.value.from = nodes[param.value.from];
        param.value.to = nodes[param.value.to];
      }
    });
    console.log(node);  
  });
}

const markReachable = (nodes) => {
  _.each(nodes, function(node){
    if(node.type === nodeType.OUTPUT.id || node.type === nodeType.DELAY_LINE.id){
      markAsReachable(node);
    }
  });
}

const markAsReachable = (node) => {
  node.reachable = true;
  _.each(node.params, function(param){
    // abort if value is not yet set
    if(!param.value.from) return;

    if(param.type === paramType.LINK.id && !param.value.from.reachable && param.value.from.type !== nodeType.DELAY_LINE.id){
      markAsReachable(param.value.from);
    }
  });
}

const removeUnreachable = (nodes) => {
  return _.filter(nodes, node => node.reachable);
}

function setParamNodePosAndExtractConstants(nodes){
  var constants = [];
  _.each(nodes, function(node){
    if(node.reachable){
      _.each(node.params, function(param){
        if(param.type === paramType.CONSTANT.id || param.type === paramType.OUTPUT.id){
          param.nodePos = constants.length + config.matrix.numberOfInputs;
          constants.push(param.value);
        } else if(param.type === paramType.INPUT.id){
          param.nodePos = param.value;
        }
      });
    }
  });
  return constants;
}

function getReachableIndependentNodes(nodes){
  var independentNodes = [];
  _.each(nodes, function(node){
    var independent = true;
    if(node.reachable){
      _.each(node.params, function(param){
        if(param.type === paramType.LINK.id) independent = false;
      });
    }
    if(independent) independentNodes.push(node);
  });
  return independentNodes;
}

function sortNodes(independentNodes, offset){
  var sortedNodes = [];

  _.each(independentNodes, function(node){
    if(node.nodePos == -1){
      addNode(node, sortedNodes, offset);
    }
  });
  return sortedNodes;
}

function addNode(node, sortedNodes, offset){
    var nodePos = sortedNodes.length + offset;
    node.nodePos = nodePos;
    sortedNodes.push(node);

    _.each(node.consumers, function(link){
      link.to.params[link.toParam].nodePos = nodePos;
      addNode(link.to, sortedNodes, offset);
    });
}

function isNetValid(){
  let state = store.getState();
  let nodes = state.nodes.toIndexedSeq().toJS();

  let isValid = true;

  _.each(nodes, node => {
    if(!node.valid){
      isValid = false;  
    }
  });

  return isValid;
}

function prepareNetForSerialization(){
  let state = store.getState();
  let nodesMap = state.nodes.toJS();

  // convert map to list for further processing.
  let nodes = [];
  for(let node in nodesMap){
    nodes.push(nodesMap[node]);
  }

  addMissingFieldsWithDefaults(nodes);
  
  // links are stored as ids instead of real references, convert them to references to make traversal easier.
  convertLinkValuesToRefs(nodesMap);

  markReachable(nodes);

  let nodeCount = nodes.length;
  nodes = removeUnreachable(nodes);

  let reachableNodeCount = nodes.length;
  if(reachableNodeCount != nodeCount){
    console.log((nodeCount - reachableNodeCount) + " nodes were not reachable and will not be sent to synth");
  }

  var constants = setParamNodePosAndExtractConstants(nodes);
  var independentNodes = getReachableIndependentNodes(nodes);
  var sortedNodes = sortNodes(independentNodes, config.matrix.numberOfInputs + constants.length);

  return {
    constants: constants,
    nodes: sortedNodes
  }
}

module.exports.prepareNetForSerialization = prepareNetForSerialization;
module.exports.isNetValid = isNetValid;