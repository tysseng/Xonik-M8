var paramType = require('./paramType.js');

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

module.exports.add = add;
module.exports.remove = remove;
module.exports.link = link;
module.exports.unlink = unlink;
module.exports.setParamConstant = setParamConstant;
module.exports.setParamInput = setParamInput;
module.exports.clearParam = clearParam;
module.exports.nodes = nodes;



