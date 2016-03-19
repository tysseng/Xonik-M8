var _ = require('lodash');
var paramType = require('./paramType.js');
var nodeType = require('./nodeType.js');
var config = require('../config.js');
var matrix = require('./matrix.js');

function resetNodes(nodes){
  _.each(nodes, function(node){
    node.nodePos = -1;
    node.reachable = false;
    _.each(nodes.params, function(param){
      param.nodePos = -1;
    });
  });
}

function markReachable(nodes){
  _.each(nodes, function(node){
    if(node.type === nodeType.OUTPUT || node.type === nodeType.DELAY_LINE){
      markAsReachable(node);
    }
  });
}

function markAsReachable(node){
  node.reachable = true;
  _.each(node.params, function(param){
    if(param.type === paramType.LINK && !param.value.from.reachable && param.value.from.type !== nodeType.DELAY_LINE){
      markAsReachable(param.value.from);
    }
  });
}

function setParamNodePosAndExtractConstants(nodes){
  var constants = [];
  _.each(nodes, function(node){
    if(node.reachable){
      _.each(node.params, function(param){
        if(param.type === paramType.CONSTANT){
          param.nodePos = constants.length + config.matrix.numberOfInputs;
          constants.push(param.value);
        } else if(param.type === paramType.INPUT){
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
        if(param.type === paramType.LINK) independent = false;
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

function prepareNetForSerialization(){
  var nodes = matrix.nodes;
  resetNodes(nodes);
  markReachable(nodes);
  var constants = setParamNodePosAndExtractConstants(nodes);

  var independentNodes = getReachableIndependentNodes(nodes);
  var sortedNodes = sortNodes(independentNodes, config.matrix.numberOfInputs + constants.length);

  return {
    constants: constants,
    nodes: sortedNodes
  }
}

module.exports.prepareNetForSerialization = prepareNetForSerialization;