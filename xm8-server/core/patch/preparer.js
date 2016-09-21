import _ from 'lodash';
import paramTypes from '../../shared/graph/ParameterTypes';
import nodeTypes from '../../shared/graph/NodeTypes';
import { outputsById } from '../../shared/graph/Outputs';
import config from '../../shared/config';

let paramType = paramTypes.map;
let nodeType = nodeTypes.map;
let nodeTypesIdMap = nodeTypes.idMap;


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
  });
}

export const markReachable = (nodes) => {
  _.each(nodes, function(node){
    if(node.type === nodeType.OUTPUT.id || node.type === nodeType.OUTPUT_TUNED.id || node.type === nodeType.DELAY_LINE.id){
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
          param.nodePos = constants.length + config.graph.numberOfInputs;

          if(param.type === paramType.OUTPUT.id){
            constants.push(outputsById[param.value].hwId);

          } else {
            constants.push(param.value);
          }
        } else if(param.type === paramType.INPUT.id){
          param.nodePos = param.value;
        }
      });
    }
  });
  return constants;
}

// Returns all nodes that are only linked FROM, not to, and that are at
// the start of a path that leads to an output or delay line
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

// Traverses the node tree from independent nodes to all their outputs. This orders them in an array in a way
// that makes sure that if we calculate any outputs in the same order, we can traverse the array only once to
// calculate all outputs.
const sortNodes = (independentNodes, offset) => {

  let debugSorting = true;

  var sortedNodes = [];

  let i = 0;
  while (i < independentNodes.length) {

    let node = independentNodes[i];

    if(node.nodePos === -1){
      var nodePos = sortedNodes.length + offset;
      node.nodePos = nodePos;
      sortedNodes.push(node);

      if(debugSorting) console.log("\nSorted: pushing", node.name);

      if(debugSorting) console.log("\nChecking consumers of node", node.name);

      _.each(node.consumers, link => {
        let toNode = link.to;
        toNode.params[link.toParam].nodePos = nodePos;

        // check if all nodes linking to the toNode has been
        // assigned a position in the sortedNodes array.
        // If true, it is safe to add the to-node as well.
        // If false, the to-node will be visited later when the missing
        // dependencies have been added.
        let allDependenciesResolved = true;

        if(debugSorting) console.log("Checking consumer node", toNode.name);

        _.each(toNode.params, param => {
          if(isLink(param.type)){

            if(debugSorting) console.log("Checking param", param.id, "of", toNode.name, ", pos is", param.nodePos);

            if(param.nodePos === undefined) {
              allDependenciesResolved = false;
            }
          }
        });

        if(allDependenciesResolved){

          if(debugSorting) console.log("\nIndependent: pushing", toNode.name);

          independentNodes.push(toNode);
        }
      });
    }

    i++;
  }

  if(debugSorting) {
    console.log("\nSorting completed. Ordering:\n---");
    _.each(sortedNodes, node => {
      console.log(node.name);
    });
  }

  return sortedNodes;
}

function isNetValid(nodesState){
  let nodes = nodesState.toIndexedSeq().toJS();

  let isValid = true;

  _.each(nodes, node => {
    if(!node.valid){
      isValid = false;  
    }
  });

  return isValid;
}

function prepareNetForSerialization(nodesMap){

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
  var sortedNodes = sortNodes(independentNodes, config.graph.numberOfInputs + constants.length);

  return {
    constants: constants,
    nodes: sortedNodes
  }
}

module.exports.prepareNetForSerialization = prepareNetForSerialization;
module.exports.isNetValid = isNetValid;