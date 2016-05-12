import _ from 'lodash';
import paramTypes from '../../shared/matrix/ParameterTypes.js';
import nodeTypes from '../../shared/matrix/NodeTypes.js';
import config from '../config.js';
import store from '../../state/store.js';

let paramType = paramTypes.map;
let nodeType = nodeTypes.map;
let nodeTypesIdMap = nodeTypes.idMap

const addMissingFieldsWithDefaults = (nodes) => {
  _.each(nodes, function(node){
    node.nodePos = -1;
    node.reachable = false;
    node.consumers = [];
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

const linkNodes = (from, to, toParam) => {
  var link = {
    from: from,
    to: to,
    toParam: toParam
  };

  from.consumers.push(link);
  to.params[toParam].value = link;
  to.params[toParam].type = paramType.LINK.id;
  return link;
}

const mergeWithLinks = (nodes, links) => {
  _.each(links, (link) => {
    console.log(link)
    linkNodes(nodes[link.from], nodes[link.to], link.toParam);
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
        if(param.type === paramType.CONSTANT.id){
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
  let nodes = state.nodes.toIndexedSeq().toJS();
  let links = state.links.toIndexedSeq().toJS();

  let nodeCount = nodes.length;

  addMissingFieldsWithDefaults(nodes);

  // nodes and links are kept separate in the state object, merge them to make traversal easier
  mergeWithLinks(nodes, links);
  markReachable(nodes);
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