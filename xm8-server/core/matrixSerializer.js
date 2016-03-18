var _ = require('lodash');
var spiType = require('./spiType.js');

function serializeNode(node){

  var nodeBuffer = new Buffer(spiType.NODE.size);
  nodeBuffer.writeUInt8(spiType.NODE.size, 0);
  nodeBuffer.writeUInt8(spiType.NODE.id, 1);
  nodeBuffer.writeUInt16BE(node.nodePos, 2);
  nodeBuffer.writeUInt8(node.type, 4);

  for(var i = 0; i<8; i++){
    var paramVal = (i < node.paramsInUse ? node.params[i].nodePos : 0);
    nodeBuffer.writeInt16BE(paramVal, i * 2 + 5);
  }

  nodeBuffer.writeUInt8(node.paramsInUse, 21);

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


//console.log(constantBuffer.toString('hex'));

module.exports.serializeNode = serializeNode;
module.exports.serializeConstant = serializeConstant;

