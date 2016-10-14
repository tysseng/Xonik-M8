var _ = require('lodash');
var spiType = require('../spi/spiType.js');

export const serializeNode = node => {
  var buffer = new Buffer(spiType.NODE.size);
  buffer.writeUInt8(spiType.NODE.size, 0);
  buffer.writeUInt8(spiType.NODE.id, 1);
  buffer.writeUInt16BE(node.nodePos, 2);
  buffer.writeUInt8(node.typeHwId, 4);

  let paramsInUse = node.paramsInUse;

  for(var i = 0; i<8; i++){
    var paramVal = (i < paramsInUse ? node.params[i].nodePos : 0);
    buffer.writeUInt16BE(paramVal, i * 2 + 5);
  }

  buffer.writeUInt8(paramsInUse, 21);

  var result = (node.result.value && node.result.value !== '' ? node.result.value : 0);
  buffer.writeInt16BE(result, 22);
  return buffer;
}

export const serializeVoiceGroupId = voiceGroupId => {
  var buffer = new Buffer(spiType.VOICE_GROUP_ID.size);
  buffer.writeUInt8(spiType.VOICE_GROUP_ID.size, 0);
  buffer.writeUInt8(spiType.VOICE_GROUP_ID.id, 1);
  buffer.writeUInt8(voiceGroupId, 2);

  return buffer;
}

export const serializeConstant = (position, value) => {
  var buffer = new Buffer(spiType.CONSTANT.size);
  buffer.writeUInt8(spiType.CONSTANT.size, 0);
  buffer.writeUInt8(spiType.CONSTANT.id, 1);
  buffer.writeUInt16BE(position, 2);
  buffer.writeInt16BE(value, 4);

  return buffer;
}

export const serializeConstantsCount = constants => {
  var buffer = new Buffer(spiType.CONSTANTS_COUNT.size);
  buffer.writeUInt8(spiType.CONSTANTS_COUNT.size, 0);
  buffer.writeUInt8(spiType.CONSTANTS_COUNT.id, 1);
  buffer.writeUInt16BE(constants.length, 2);

  return buffer;
}

export const serializeNodeCount = nodes => {
  var buffer = new Buffer(spiType.NODE_COUNT.size);
  buffer.writeUInt8(spiType.NODE_COUNT.size, 0);
  buffer.writeUInt8(spiType.NODE_COUNT.id, 1);
  buffer.writeUInt16BE(nodes.length, 2);

  return buffer;
}

export const serializeDirectOutput = (inputHwId, outputHwId) => {
  var buffer = new Buffer(spiType.DIRECT_OUTPUT.size);
  buffer.writeUInt8(spiType.DIRECT_OUTPUT.size, 0);
  buffer.writeUInt8(spiType.DIRECT_OUTPUT.id, 1);
  buffer.writeUInt16BE(inputHwId, 2);
  buffer.writeUInt16BE(outputHwId, 4);

  return buffer;
}

export const serializeInputConfig = inputConfig => {

  var buffer = new Buffer(spiType.INPUT_CONFIG.size);
  buffer.writeUInt8(spiType.INPUT_CONFIG.size, 0);
  buffer.writeUInt8(spiType.INPUT_CONFIG.id, 1);
  buffer.writeUInt16BE(inputConfig.inputPosition, 2); // position in graph input array

  // midi bytes will be written even if they should not be used by the controller
  buffer.writeUInt8(inputConfig.includeMidi ? 1 : 0, 4);
  buffer.writeUInt8(inputConfig.midi.status, 5);
  buffer.writeUInt8(inputConfig.midi.data1, 6);
  buffer.writeUInt8(inputConfig.midi.hires ? 1 : 0, 7);
  buffer.writeUInt8(inputConfig.midi.send ? 1 : 0, 8);
  buffer.writeUInt8(inputConfig.midi.receive ? 1 : 0, 9);

  buffer.writeInt16BE(inputConfig.min, 10);
  buffer.writeInt16BE(inputConfig.max, 12);
  buffer.writeUInt8(inputConfig.stepGenerationModeHwId, 14);
  buffer.writeUInt16BE(inputConfig.stepGenerationValue, 15);

  return buffer;
}

export const serializeInputConfigOption = (inputConfig, index) => {

  var buffer = new Buffer(spiType.INPUT_CONFIG_OPTION.size);
  buffer.writeUInt8(spiType.INPUT_CONFIG_OPTION.size, 0);
  buffer.writeUInt8(spiType.INPUT_CONFIG_OPTION.id, 1);
  buffer.writeUInt8(index, 2);
  buffer.writeInt16BE(inputConfig.optionValues[index], 3);

  return buffer;
}

export const serializeInputConfigOptionMidi = (inputConfig, index) => {

  var buffer = new Buffer(spiType.INPUT_CONFIG_OPTION_MIDI.size);
  buffer.writeUInt8(spiType.INPUT_CONFIG_OPTION_MIDI.size, 0);
  buffer.writeUInt8(spiType.INPUT_CONFIG_OPTION_MIDI.id, 1);
  buffer.writeUInt8(index, 2);
  // 16 bit unsigned to be able to use hi-res midi
  buffer.writeUInt16BE(inputConfig.optionValuesMidi[index], 3);

  return buffer;
}



