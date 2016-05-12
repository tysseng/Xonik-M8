var _ = require('lodash');
var spiType = require('../spi/spiType.js');

function serializeNode(node){

  console.log(node);

  var nodeBuffer = new Buffer(spiType.NODE.size);
  nodeBuffer.writeUInt8(spiType.NODE.size, 0);
  nodeBuffer.writeUInt8(spiType.NODE.id, 1);
  nodeBuffer.writeUInt16BE(node.nodePos, 2);
  nodeBuffer.writeUInt8(node.type, 4);

  let paramsInUse = node.paramsInUse;

  for(var i = 0; i<8; i++){
    var paramVal = (i < paramsInUse ? node.params[i].nodePos : 0);
    nodeBuffer.writeUInt16BE(paramVal, i * 2 + 5);
  }

  nodeBuffer.writeUInt8(paramsInUse, 21);

  var result = (node.result ? node.result : 0);
  nodeBuffer.writeInt16BE(result, 22);
  return nodeBuffer;
}

function serializeConstant(position, value){
  var constantBuffer = new Buffer(spiType.CONSTANT.size);
  constantBuffer.writeUInt8(spiType.CONSTANT.size, 0);
  constantBuffer.writeUInt8(spiType.CONSTANT.id, 1);
  constantBuffer.writeUInt16BE(position, 2);
  constantBuffer.writeInt16BE(value, 4);

  return constantBuffer;
}

function serializeConstantsCount(constants){
  var countBuffer = new Buffer(spiType.CONSTANTS_COUNT.size);
  countBuffer.writeUInt8(spiType.CONSTANTS_COUNT.size, 0);
  countBuffer.writeUInt8(spiType.CONSTANTS_COUNT.id, 1);
  countBuffer.writeUInt16BE(constants.length, 2);

  return countBuffer;
}

function serializeNodeCount(nodes){
  var countBuffer = new Buffer(spiType.NODE_COUNT.size);
  countBuffer.writeUInt8(spiType.NODE_COUNT.size, 0);
  countBuffer.writeUInt8(spiType.NODE_COUNT.id, 1);
  countBuffer.writeUInt16BE(nodes.length, 2);

  return countBuffer;
}




//console.log(constantBuffer.toString('hex'));

module.exports.serializeNode = serializeNode;
module.exports.serializeConstant = serializeConstant;
module.exports.serializeConstantsCount = serializeConstantsCount;
module.exports.serializeNodeCount = serializeNodeCount;

