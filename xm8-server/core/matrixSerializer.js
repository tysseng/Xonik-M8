var binstruct = require('binstruct');
var _ = require('lodash');
var spiType = require('./spiType.js');

// TODO: Hvordan instansiere nytt buffer hver gang? (Eller billigere å gjenbruke, men
// må da huske å nullstille)

var nodeBuffer = new Buffer(spiType.NODE.size);
var nodeStruct = binstruct
  .def()
  .byte(spiType.NODE.size) // number of bytes
  .byte(2)  // package type = NODE
  .uint16('position')
  .byte('nodeType')
  .int16('param0', 0x00)
  .int16('param1', 0x00)
  .int16('param2', 0x00)
  .int16('param3', 0x00)
  .int16('param4', 0x00)
  .int16('param5', 0x00)
  .int16('param6', 0x00)
  .int16('param7', 0x00)
  .byte('paramsInUse', 0)
  .int16('result', 0x00) // some nodes may have a predefined result - delay nodes need an initial result etc.
  .wrap(nodeBuffer);

var constantBuffer = new Buffer(6);
var constantStruct = binstruct
  .def()
  .byte('byteCount') 
  .byte('packageType')
  .uint16('position')
  .int16('value')
  .wrap(constantBuffer);

function serializeNode(node){

  var paramsInUse = node.params.length;

  nodeStruct.packageType = spiType.NODE.id;
  nodeStruct.position = node.nodePos; 
  nodeStruct.nodeType = node.type;
  if(paramsInUse > 0) nodeStruct.param0 = node.params[0].nodePos;
  if(paramsInUse > 1) nodeStruct.param0 = node.params[1].nodePos;
  if(paramsInUse > 2) nodeStruct.param0 = node.params[2].nodePos;
  if(paramsInUse > 3) nodeStruct.param0 = node.params[3].nodePos;
  if(paramsInUse > 4) nodeStruct.param0 = node.params[4].nodePos;
  if(paramsInUse > 5) nodeStruct.param0 = node.params[5].nodePos;
  if(paramsInUse > 6) nodeStruct.param0 = node.params[6].nodePos;
  if(paramsInUse > 7) nodeStruct.param0 = node.params[7].nodePos;
  nodeStruct.paramsInUse = paramsInUse;
  nodeStruct.result = (node.result ? node.result : 0);

  var nodeData = nodeStruct.writeValues();    
  return nodeData;
}

function serializeConstant(position, value){
  constantStruct.byteCount = spiType.CONSTANT.size; // number of bytes
  constantStruct.packageType = spiType.CONSTANT.id;
  constantStruct.position = position;
  constantStruct.value = value;
}


//console.log(constantBuffer.toString('hex'));

module.exports.serializeNode = serializeNode;
module.exports.serializeConstant = serializeConstant;

