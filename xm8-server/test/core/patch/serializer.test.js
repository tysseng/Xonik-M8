import chai from 'chai';

import spiType from '../../../core/spi/spiType';
import { nodeTypesById } from '../../../shared/graph/NodeTypes';
import { prepareNetForSerialization } from '../../../core/patch/preparer';
import { prepareInputs } from '../../../core/patch/inputConfigPreparer';
import {
  serializeNodeCount,
  serializeNode,
  serializeConstantsCount,
  serializeConstant,
  serializeVoiceGroupId,
  serializeDirectOutput,
  serializeInputConfig,
  serializeInputConfigOption,
  serializeInputConfigOptionMidi} from '../../../core/patch/serializer';
import testPatch from './mockedNodes/test-patch';
import physicalInputsForSerialization from './mockedInputs/physical-inputs-for-serialization';
import { inputWithNumberOfSteps, inputWithOptions } from './mockedInputs/physical-inputs-for-serialization';

chai.should();

describe('Serializer:', function() {

  describe('Node count buffer', function() {

    let preparedNet = prepareNetForSerialization(testPatch.toJS());
    let nodes = preparedNet.nodes;
    let countBuffer = serializeNodeCount(nodes);

    it('should be correct length', function() {
      countBuffer.length.should.equal(spiType.NODE_COUNT.size);
    });

    it('should have correct command size', function() {
      countBuffer.readUInt8(0).should.equal(spiType.NODE_COUNT.size);
    });

    it('should have correct command id', function() {
      countBuffer.readUInt8(1).should.equal(spiType.NODE_COUNT.id);
    });

    it('should have correct node count', function() {
      let nodesInPatch = Object.keys(nodes).length;
      countBuffer.readUInt16BE(2).should.equal(nodesInPatch);
    });
  });

  describe('Constants count buffer', function() {

    let preparedNet = prepareNetForSerialization(testPatch.toJS());
    let constants = preparedNet.constants;
    let countBuffer = serializeConstantsCount(constants);

    it('should be correct length', function() {
      countBuffer.length.should.equal(spiType.CONSTANTS_COUNT.size);
    });

    it('should have correct command size', function() {
      countBuffer.readUInt8(0).should.equal(spiType.CONSTANTS_COUNT.size);
    });

    it('should have correct command id', function() {
      countBuffer.readUInt8(1).should.equal(spiType.CONSTANTS_COUNT.id);
    });

    it('should have correct constants count', function() {
      countBuffer.readUInt16BE(2).should.equal(constants.length);
    });
  });

  describe('Constant buffer', function() {

    let preparedNet = prepareNetForSerialization(testPatch.toJS());
    let position = 1;
    let constant = preparedNet.constants[position];

    let countBuffer = serializeConstant(position, constant);

    it('should be correct length', function() {
      countBuffer.length.should.equal(spiType.CONSTANT.size);
    });

    it('should have correct command size', function() {
      countBuffer.readUInt8(0).should.equal(spiType.CONSTANT.size);
    });

    it('should have correct command id', function() {
      countBuffer.readUInt8(1).should.equal(spiType.CONSTANT.id);
    });

    it('should have correct position', function() {
      countBuffer.readUInt16BE(2).should.equal(position);
    });

    it('should have correct value', function() {
      countBuffer.readUInt16BE(4).should.equal(constant);
    });
  });

  describe('Node buffer', function() {

    let preparedNet = prepareNetForSerialization(testPatch.toJS());

    let nodeWithConstants = preparedNet.nodes['0'];
    let nodeWithResult = preparedNet.nodes['1'];

    let nodeBuffer = serializeNode(nodeWithConstants);
    let nodeBufferWithResult = serializeNode(nodeWithResult);

    it('should be correct length', function() {
      nodeBuffer.length.should.equal(spiType.NODE.size);
    });

    it('should have correct command size', function() {
      nodeBuffer.readUInt8(0).should.equal(spiType.NODE.size);
    });

    it('should have correct command id', function() {
      nodeBuffer.readUInt8(1).should.equal(spiType.NODE.id);
    });

    it('should have correct position', function() {
      nodeBuffer.readUInt16BE(2).should.equal(nodeWithConstants.nodePos);
    });

    it('should have correct type', function() {
      nodeBuffer.readUInt8(4).should.equal(nodeTypesById[nodeWithConstants.type].hwId);
    });

    it('should have correct parameter values', function() {
      nodeBuffer.readUInt16BE(5).should.equal(nodeWithConstants.params['0'].nodePos);
      nodeBuffer.readUInt16BE(7).should.equal(nodeWithConstants.params['1'].nodePos);
      nodeBuffer.readUInt16BE(9).should.equal(nodeWithConstants.params['2'].nodePos);
      nodeBuffer.readUInt16BE(11).should.equal(nodeWithConstants.params['3'].nodePos);

      //params not in use
      nodeBuffer.readUInt16BE(13).should.equal(0);
      nodeBuffer.readUInt16BE(15).should.equal(0);
      nodeBuffer.readUInt16BE(17).should.equal(0);
      nodeBuffer.readUInt16BE(19).should.equal(0);
    });

    it('should have correct number of params in use', function() {
      nodeBuffer.readUInt8(21).should.equal(nodeWithConstants.paramsInUse);
    });

    it('should have result value 0 when no result is set', function() {
      nodeBuffer.readUInt16BE(22).should.equal(0); // no result in use
    });

    it('should have correct result when result is set', function() {
      nodeBufferWithResult.readUInt16BE(22).should.equal(13107);
    });
  });

  describe('Voice group id buffer', function() {

    let voiceGroupIdBuffer = serializeVoiceGroupId(7);

    it('should be correct length', function() {
      voiceGroupIdBuffer.length.should.equal(spiType.VOICE_GROUP_ID.size);
    });

    it('should have correct command size', function() {
      voiceGroupIdBuffer.readUInt8(0).should.equal(spiType.VOICE_GROUP_ID.size);
    });

    it('should have correct command id', function() {
      voiceGroupIdBuffer.readUInt8(1).should.equal(spiType.VOICE_GROUP_ID.id);
    });

    it('should have correct voice group id', function() {
      voiceGroupIdBuffer.readUInt8(2).should.equal(7);
    });
  });

  describe('Voice group id buffer', function() {

    let voiceGroupIdBuffer = serializeDirectOutput(4, 5);

    it('should be correct length', function() {
      voiceGroupIdBuffer.length.should.equal(spiType.DIRECT_OUTPUT.size);
    });

    it('should have correct command size', function() {
      voiceGroupIdBuffer.readUInt8(0).should.equal(spiType.DIRECT_OUTPUT.size);
    });

    it('should have correct command id', function() {
      voiceGroupIdBuffer.readUInt8(1).should.equal(spiType.DIRECT_OUTPUT.id);
    });

    it('should have correct inputHwId', function() {
      voiceGroupIdBuffer.readUInt16BE(2).should.equal(4);
    });

    it('should have correct outputHwId', function() {
      voiceGroupIdBuffer.readUInt16BE(4).should.equal(5);
    });
  });


  describe('InputConfig buffer', function() {
    let inputs = prepareInputs(physicalInputsForSerialization);
    let inputToSerialize = inputs[inputWithNumberOfSteps.id];
    let buffer = serializeInputConfig(inputToSerialize);

    it('should be correct length', function() {
      buffer.length.should.equal(spiType.INPUT_CONFIG.size);
    });

    it('should have correct command size', function() {
      buffer.readUInt8(0).should.equal(spiType.INPUT_CONFIG.size);
    });

    it('should have correct command id', function() {
      buffer.readUInt8(1).should.equal(spiType.INPUT_CONFIG.id);
    });

    it('should have correct position in input array', function() {
      buffer.readUInt16BE(2).should.equal(inputToSerialize.inputPosition);
    });

    it('should include midi', function() {
      buffer.readUInt8(4).should.equal(1);
    });

    it('should have correct midi status', function() {
      buffer.readUInt8(5).should.equal(176);
    });

    it('should have correct midi data1', function() {
      buffer.readUInt8(6).should.equal(7);
    });

    it('should have correct midi hires', function() {
      buffer.readUInt8(7).should.equal(1);
    });

    it('should have correct midi send', function() {
      buffer.readUInt8(8).should.equal(1);
    });

    it('should have correct midi receive', function() {
      buffer.readUInt8(9).should.equal(1);
    });

    it('should set correct min', function() {
      buffer.readInt16BE(10).should.equal(0);
    });

    it('should set correct max', function() {
      buffer.readInt16BE(12).should.equal(32767);
    });

    it('should set correct step generation mode', function() {
      buffer.readUInt8(14).should.equal(inputToSerialize.stepGenerationModeHwId);
    });

    it('should set correct step generation value', function() {
      buffer.readUInt16BE(15).should.equal(inputToSerialize.stepGenerationValue);
    });
  });

  describe('InputConfig options buffer', function() {

    let inputs = prepareInputs(physicalInputsForSerialization);
    let inputToSerialize = inputs[inputWithOptions.id];
    let expectedIndex = 2;
    let buffer = serializeInputConfigOption(inputToSerialize, expectedIndex);

    it('should be correct length', function() {
      buffer.length.should.equal(spiType.INPUT_CONFIG_OPTION.size);
    });

    it('should have correct command size', function() {
      buffer.readUInt8(0).should.equal(spiType.INPUT_CONFIG_OPTION.size);
    });

    it('should have correct command id', function() {
      buffer.readUInt8(1).should.equal(spiType.INPUT_CONFIG_OPTION.id);
    });

    it('should set correct index', function() {
      buffer.readUInt8(2).should.equal(expectedIndex);
    });

    it('should set correct value', function() {
      buffer.readInt16BE(3).should.equal(inputToSerialize.options[expectedIndex].value);
    });
  });

  describe('InputConfig options buffer midi', function() {

    let inputs = prepareInputs(physicalInputsForSerialization);
    let inputToSerialize = inputs[inputWithOptions.id];
    let expectedIndex = 2;
    let buffer = serializeInputConfigOptionMidi(inputToSerialize, expectedIndex);

    it('should be correct length', function() {
      buffer.length.should.equal(spiType.INPUT_CONFIG_OPTION_MIDI.size);
    });

    it('should have correct command size', function() {
      buffer.readUInt8(0).should.equal(spiType.INPUT_CONFIG_OPTION_MIDI.size);
    });

    it('should have correct command id', function() {
      buffer.readUInt8(1).should.equal(spiType.INPUT_CONFIG_OPTION_MIDI.id);
    });

    it('should set correct index', function() {
      buffer.readUInt8(2).should.equal(expectedIndex);
    });

    it('should set correct value', function() {
      buffer.readUInt16BE(3).should.equal(inputToSerialize.options[expectedIndex].valuemidi);
    });
  });
});