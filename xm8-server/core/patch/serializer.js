var _ = require('lodash');
var spiType = require('../spi/spiType.js');
import { inputStepGenerationTypesById } from '../../shared/inputs/InputStepsGenerationTypes';

export const serializeNode = node => {

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

  var result = (node.result.value && node.result.value !== '' ? node.result.value : 0);
  nodeBuffer.writeInt16BE(result, 22);
  return nodeBuffer;
}

export const serializeVoiceGroupId = voiceGroupId => {
  var constantBuffer = new Buffer(spiType.VOICE_GROUP_ID.size);
  constantBuffer.writeUInt8(spiType.VOICE_GROUP_ID.size, 0);
  constantBuffer.writeUInt8(spiType.VOICE_GROUP_ID.id, 1);
  constantBuffer.writeUInt8(voiceGroupId, 2);

  return constantBuffer;
}

export const serializeConstant = (position, value) => {
  var constantBuffer = new Buffer(spiType.CONSTANT.size);
  constantBuffer.writeUInt8(spiType.CONSTANT.size, 0);
  constantBuffer.writeUInt8(spiType.CONSTANT.id, 1);
  constantBuffer.writeUInt16BE(position, 2);
  constantBuffer.writeInt16BE(value, 4);

  return constantBuffer;
}

export const serializeConstantsCount = constants => {
  var countBuffer = new Buffer(spiType.CONSTANTS_COUNT.size);
  countBuffer.writeUInt8(spiType.CONSTANTS_COUNT.size, 0);
  countBuffer.writeUInt8(spiType.CONSTANTS_COUNT.id, 1);
  countBuffer.writeUInt16BE(constants.length, 2);

  return countBuffer;
}

export const serializeNodeCount = nodes => {
  var countBuffer = new Buffer(spiType.NODE_COUNT.size);
  countBuffer.writeUInt8(spiType.NODE_COUNT.size, 0);
  countBuffer.writeUInt8(spiType.NODE_COUNT.id, 1);
  countBuffer.writeUInt16BE(nodes.length, 2);

  return countBuffer;
}

export const serializeDirectOutput = (inputHwId, outputHwId) => {
  var countBuffer = new Buffer(spiType.DIRECT_OUTPUT.size);
  countBuffer.writeUInt8(spiType.DIRECT_OUTPUT.size, 0);
  countBuffer.writeUInt8(spiType.DIRECT_OUTPUT.id, 1);
  countBuffer.writeUInt16BE(inputHwId, 2);
  countBuffer.writeUInt16BE(outputHwId, 4);

  return countBuffer;
}

export const serializeInputConfig = inputConfig => {

  let numberOfOptions = inputConfig.optionValuesMidi.length;

  var countBuffer = new Buffer(spiType.INPUT_CONFIG.size);
  countBuffer.writeUInt8(spiType.INPUT_CONFIG.size, 0);
  countBuffer.writeUInt8(spiType.INPUT_CONFIG.id, 1);
  countBuffer.writeUInt16BE(inputConfig.inputPosition, 2); // position in graph input array
  countBuffer.writeUInt8(inputConfig.midi.status, 4);
  countBuffer.writeUInt8(inputConfig.midi.data1, 5);
  countBuffer.writeUInt8(inputConfig.midi.hires ? 1 : 0, 6);
  countBuffer.writeUInt8(inputConfig.midi.send ? 1 : 0, 7);
  countBuffer.writeUInt8(inputConfig.midi.receive ? 1 : 0, 8);

  // TODO: Handle other modes. Split mode options into separate command?
  countBuffer.writeUInt8(inputConfig.stepGenerationModeHwId, 9);

  if(inputConfig.stepGenerationMode === inputStepGenerationTypesById.OPTIONS.id) {
    countBuffer.writeUInt8(numberOfOptions, 10);
    for (i = 0; i < numberOfOptions; i++) {
      countBuffer.writeUInt8(inputConfig.optionValuesMidi[i], 11 + i);
    }
  } else if(inputConfig.stepGenerationMode === inputStepGenerationTypesById.OPTIONS.id) {

  } else if(inputConfig.stepGenerationMode === inputStepGenerationTypesById.OPTIONS.id) {

  }
}

