import chai from 'chai';
import _ from 'lodash';

import config from '../../../shared/config';
import { outputsById } from '../../../shared/graph/Outputs';
import spiType from '../../../core/spi/spiType.js';
import { prepareNetForSerialization, markReachable, setParamsInUse } from '../../../core/patch/preparer';
import testPatch from './mockedNodes/test-patch';
import nodesWithInvalid from './mockedNodes/nodes-with-invalid';
import nodesWithUnreachable from './mockedNodes/nodes-with-unreachable';
import nodesWithLinks from './mockedNodes/nodes-with-links';
import nodesWithConstants from './mockedNodes/nodes-with-constants';
import nodesWithParamsInUse from './mockedNodes/nodes-with-params-in-use';

chai.should();

describe('Patch preparation:', function() {

  let nodes = testPatch.contents.patch.graph.nodes;
  let preparedNet = prepareNetForSerialization(nodes);

  describe('Constant extraction:', function() {

    let result = prepareNetForSerialization(nodesWithConstants);
    let constants = result.constants;

    it('should have extracted 4 constants', function() {
      constants.length.should.equal(4);
    });

    it('should have calculated correct positions for constants', function() {

      let pos0 = nodesWithConstants['1'].params['0'].nodePos;
      let pos1 = nodesWithConstants['1'].params['1'].nodePos;
      let pos2 = nodesWithConstants['0'].params['1'].nodePos;

      // Three constants
      constants[pos0 - config.graph.numberOfInputs].should.equal('1');
      constants[pos1 - config.graph.numberOfInputs].should.equal('2');
      constants[pos2 - config.graph.numberOfInputs].should.equal('3');
    });

    it('should have calculated correct position for output id and use hwId instead of id', function() {

      // Output node's 'output to' parameter, value is VCO1 pitch hwId.
      let pos3 = nodesWithConstants['2'].params['1'].nodePos;
      // TODO: This should be 0, not '0', which means that we do not use hwId here. Check that it is done during serialization
      constants[pos3 - config.graph.numberOfInputs].should.equal(0)
    });

  });

  describe('Params in use calculation:', function() {

    prepareNetForSerialization(nodesWithParamsInUse);

    it('node with constant param length should have paramsInUse calculated', function() {
      nodesWithParamsInUse['0'].paramsInUse.should.equal(1);
    });

    it('node with variable param length should have paramsInUse calculated', function() {
      nodesWithParamsInUse['1'].paramsInUse.should.equal(2);
    });
  });

  describe('Link value to refs conversion:', function() {

    prepareNetForSerialization(nodesWithLinks);

    it('should convert link values to real objects', function() {
      nodesWithLinks['1'].params['0'].value.from.should.equal(nodesWithLinks['0']);
      nodesWithLinks['2'].params['0'].value.from.should.equal(nodesWithLinks['1']);
    });

  });

  describe('Reachable-preparer:', function() {

    prepareNetForSerialization(nodesWithUnreachable);

    it('should mark all nodes as reachable', function() {
      // We have three initialy reachable node types
      let preparedNodes = preparedNet.nodes;

      _.each(preparedNodes, node => {
        node.reachable.should.equal(true);
      });
    });

    it('should mark nodes that do not lead to an output as unreachable', function() {
      // a 'loose' node
      nodesWithUnreachable['0'].reachable.should.equal(false);
    });

    it('should mark output nodes as reachable', function() {
      // an output node
      nodesWithUnreachable['1'].reachable.should.equal(true);
    });

    it('should mark output tuned nodes as reachable', function() {
      // an output tuned node
      nodesWithUnreachable['2'].reachable.should.equal(true);
    });

    it('should mark delay line nodes as reachable', function() {
      // a delay line node
      nodesWithUnreachable['3'].reachable.should.equal(true);
    });

    it('should mark nodes that links to another reachable node as reachable', function() {
      // a node that links to another reachable node
      nodesWithUnreachable['4'].reachable.should.equal(true);
    });
  });

  // TODO: Node tre legges til to ganger. Det ser ut som consumer-kalkulering har sviktet, både node 1 og 2 linker til param 0
  // på node 3

 /*
  describe('Is valid', function() {
    it('should be false if one node is invalid', function() {

      let preparedNet = prepareNetForSerialization(nodesWithInvalid);
      let preparedNodes = preparedNet.nodes;

      _.each(preparedNodes, node => {
        node.reachable.should.equal(true);
      });
    });

    it('should be true if all nodes are valid', function() {

      let preparedNet = prepareNetForSerialization(nodesWithInvalid);
      let preparedNodes = preparedNet.nodes;

      _.each(preparedNodes, node => {
        node.reachable.should.equal(true);
      });
    });

  });
  */
});

/**
 Test that single node nets with each of these three types are reachable:
 const markReachable = (nodes) => {
  _.each(nodes, function(node){
    if(node.type === nodeType.OUTPUT.id || node.type === nodeType.OUTPUT_TUNED.id || node.type === nodeType.DELAY_LINE.id){
      markAsReachable(node);
    }
  });
}
 */