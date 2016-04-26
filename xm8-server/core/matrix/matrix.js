var paramType = require('../../shared/matrix/ParameterTypes.js').map;
var _ = require('lodash');

var nodes = [];
var nodeIdCounter = 0;

function getNodeById(nodeId){
  return _.find(nodes, function(node) { return node.id === nodeId });
}

function add(node){
  node.id = nodeIdCounter++;
  nodes.push(node);

/*
  for(var i = 0; i<node.params.length; i++){
    var param = node.params[i];
    if(param.type === paramType.LINK.id){
      this.linkById(param.value, id, i);
    }
  }*/

  console.log("Added node");
  console.log(node);

  return node;
}

function update(node){
  remove(getNodeById(node.id));
  nodes.push(node);

  console.log("Updated node");
  console.log(node);

  return node;
}

function remove(node){
  _.each(node.consumers, function(linkToConsumer){
    unlink(linkToConsumer);
  });

  _.each(node.params, function(param){
    if(param.type === paramType.LINK.id){
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
  to.params[toParam].type = paramType.LINK.id;
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
  node.params[param].type = paramType.UNUSED.id;    
}

function setParamConstant(node, param, value){
  node.params[param].value = value;
  node.params[param].type = paramType.CONSTANT.id;
}

function setParamInput(node, param, input){
  node.params[param].value = input;
  node.params[param].type = paramType.INPUT.id;
}

module.exports.add = add;
module.exports.update = update;
module.exports.remove = remove;
module.exports.link = link;
module.exports.unlink = unlink;
module.exports.setParamConstant = setParamConstant;
module.exports.setParamInput = setParamInput;
module.exports.clearParam = clearParam;
module.exports.nodes = nodes;



