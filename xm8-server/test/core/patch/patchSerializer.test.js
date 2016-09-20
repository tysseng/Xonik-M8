import chai from 'chai';
import _ from 'lodash'

import spiType from '../../../core/spi/spiType.js';
import { serialize } from '../../../core/patch/patchSerializer';
import testPatch from './mockedNodes/test-patch';

chai.should();

describe('Patch serialization:', function() {

  let nodes = testPatch.contents.patch.graph.nodes;
  let buffers = serialize(nodes);

  describe('Node count buffer', function() {
    it('should be correct length', function() {
      let countBuffer = buffers[buffers.length - 1];
      countBuffer.length.should.equal(spiType.NODE_COUNT.size);
    });

    it('should have correct command size', function() {
      let countBuffer = buffers[buffers.length - 1];
      countBuffer.readUInt8(0).should.equal(spiType.NODE_COUNT.size);
    });

    it('should have correct command id', function() {
      let countBuffer = buffers[buffers.length - 1];
      countBuffer.readUInt8(1).should.equal(spiType.NODE_COUNT.id);
    });

    it('should have correct node count', function() {
      let countBuffer = buffers[buffers.length - 1];
      countBuffer.readUInt16BE(2).should.equal(nodes.length);
    });

  });
  /**
   * Should convert volts and cents by unit
   * Should map output id to constant
   * Should map physical input id
   * Should map virtual input id
   * Should prepopulate ParamVal-fields
   * Should handle links
   * All nodes should be reachable (TODO: Test unreachable later)
   * All nodes should be valid (TODO: Test invalid later)
   * Should set paramsInUse correctly
   * Should set functon id correctly
   * Should convert output id to constant in results list
   * Should order nodes correctly
   */
});