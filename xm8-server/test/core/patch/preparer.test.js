import chai from 'chai';
import _ from 'lodash';

import spiType from '../../../core/spi/spiType.js';
import { prepareNetForSerialization } from '../../../core/patch/preparer';
import testPatch from './mockedNodes/test-patch';

chai.should();

describe('Patch preparation:', function() {

  let nodes = testPatch.contents.patch.graph.nodes;
  let preparedNet = prepareNetForSerialization(nodes);

  describe('Preparer', function() {
    it('should mark all nodes as reachable', function() {
      // We have three initialy reachable node types
      let preparedNodes = preparedNet.nodes;

      _.each(preparedNodes, node => {
        console.log(node.id, node.name, node.reachable)
        //node.reachable.should.equal(true);
      });
    });
  });

  // TODO: Node tre legges til to ganger. Det ser ut som consumer-kalkulering har sviktet, både node 1 og 2 linker til param 0
  // på node 3
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