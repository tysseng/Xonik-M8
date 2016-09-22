import chai from 'chai';

import spiType from '../../../core/spi/spiType.js';
import { prepareNetForSerialization } from '../../../core/patch/preparer';
import { serializeNodeCount, serializeConstantsCount, serializeConstant } from '../../../core/patch/serializer';
import testPatchFactory from './mockedNodes/test-patch';

chai.should();

describe('Serializer:', function() {

  describe('Node count buffer', function() {

    let preparedNet = prepareNetForSerialization(testPatchFactory());
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

    let preparedNet = prepareNetForSerialization(testPatchFactory());
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

    let preparedNet = prepareNetForSerialization(testPatchFactory());
    let position = 1;
    let constant = preparedNet.constants[position];

    console.log("constant", constant)

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
      countBuffer.readUInt16BE(4).should.equal(1);
    });
  });

  /**
   * Should convert volts and cents by unit
   * Should map output id to constant
   * Should map physical input id
   * Should map virtual input id
   * Should prepopulate ParamVal-fields
   * Should handle links
   * Should set paramsInUse correctly
   * Should set functon id correctly
   * Should convert output id to constant in results list
   * Should order nodes correctly
   */
});