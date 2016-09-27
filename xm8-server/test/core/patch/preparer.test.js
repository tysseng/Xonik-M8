import chai from 'chai';
import _ from 'lodash';

import config from '../../../shared/config';
import { outputsById } from '../../../shared/graph/Outputs';

import { prepareNetForSerialization, isNetValid } from '../../../core/patch/preparer';
import nodesWithInvalid from './mockedNodes/nodes-with-invalid';
import nodesWithUnreachable from './mockedNodes/nodes-with-unreachable';
import nodesWithLinks from './mockedNodes/nodes-with-links';
import nodesWithConstants from './mockedNodes/nodes-with-constants';
import nodesWithParamsInUse from './mockedNodes/nodes-with-params-in-use';
import nodesForSorting from './mockedNodes/nodes-for-sorting';
import nodesForSortingWithLoop from './mockedNodes/nodes-for-sorting-with-loop';
import nodesWithVirtualInputs from './mockedNodes/nodes-with-virtual-inputs';
import virtualInputsForNodeTesting, { pureVirtual1, pureVirtual2 } from './mockedInputs/virtual-inputs-for-node-testing';

chai.should();

describe('Patch preparation:', function() {

  //TODO: Add missing fields test

  describe('Params in use calculation:', function () {

    prepareNetForSerialization(nodesWithParamsInUse);

    it('node with constant param length should have paramsInUse calculated', function () {
      nodesWithParamsInUse['0'].paramsInUse.should.equal(1);
    });

    it('node with variable param length should have paramsInUse calculated', function () {
      nodesWithParamsInUse['1'].paramsInUse.should.equal(2);
    });
  });

  describe('Link value to refs conversion:', function () {

    prepareNetForSerialization(nodesWithLinks);

    it('should convert link values to real objects', function () {
      nodesWithLinks['1'].params['0'].value.from.should.equal(nodesWithLinks['0']);
      nodesWithLinks['2'].params['0'].value.from.should.equal(nodesWithLinks['1']);
    });

  });

  describe('Reachable-preparer:', function () {

    let result = prepareNetForSerialization(nodesWithUnreachable);

    it('should mark all nodes as reachable', function () {
      // We have three initialy reachable node types
      let preparedNodes = result.nodes;

      _.each(preparedNodes, node => {
        node.reachable.should.equal(true);
      });
    });

    it('should have removed unreachable node', function () {
      // We have three initialy reachable node types
      let preparedNodes = result.nodes;

      // There were initially 5 nodes, one should have been removed.
      preparedNodes.length.should.equal(4);
    });

    it('should mark nodes that do not lead to an output as unreachable', function () {
      // a 'loose' node
      nodesWithUnreachable['0'].reachable.should.equal(false);
    });

    it('should mark output nodes as reachable', function () {
      // an output node
      nodesWithUnreachable['1'].reachable.should.equal(true);
    });

    it('should mark output tuned nodes as reachable', function () {
      // an output tuned node
      nodesWithUnreachable['2'].reachable.should.equal(true);
    });

    it('should mark delay line nodes as reachable', function () {
      // a delay line node
      nodesWithUnreachable['3'].reachable.should.equal(true);
    });

    it('should mark nodes that links to another reachable node as reachable', function () {
      // a node that links to another reachable node
      nodesWithUnreachable['4'].reachable.should.equal(true);
    });
  });

  describe('Constant extraction:', function () {

    let result = prepareNetForSerialization(nodesWithConstants);
    let constants = result.constants;

    it('should have extracted 4 constants', function () {
      constants.length.should.equal(4);
    });

    it('should have calculated correct positions for constants', function () {

      let pos0 = nodesWithConstants['1'].params['0'].nodePos;
      let pos1 = nodesWithConstants['1'].params['1'].nodePos;
      let pos2 = nodesWithConstants['0'].params['1'].nodePos;

      // Three constants
      constants[pos0 - config.graph.numberOfInputs].should.equal('1');
      constants[pos1 - config.graph.numberOfInputs].should.equal('2');
      constants[pos2 - config.graph.numberOfInputs].should.equal('3');
    });

    it('should have calculated correct position for output id and use hwId instead of id', function () {

      // Output node's 'output to' parameter, value is VCO1 pitch hwId.
      let pos3 = nodesWithConstants['2'].params['1'].nodePos;
      constants[pos3 - config.graph.numberOfInputs].should.equal(outputsById['0'].hwId)
    });

  });

  describe('Node sorting:', function () {

    describe('Normal graph:', function () {
      let result = prepareNetForSerialization(nodesForSorting);
      let sortedNodes = result.nodes;
      let offset = config.graph.numberOfInputs + result.constants.length;

      let outputNode = nodesForSorting['0'];
      let outputSummer = nodesForSorting['1'];
      let inputSummer = nodesForSorting['2'];
      let independent3 = nodesForSorting['3'];
      let independent2 = nodesForSorting['4'];
      let independent1 = nodesForSorting['5'];

      it('Should sort nodes correctly', function () {
        sortedNodes[0].id.should.equal(independent3.id);
        sortedNodes[1].id.should.equal(independent2.id);
        sortedNodes[2].id.should.equal(independent1.id);
        sortedNodes[3].id.should.equal(inputSummer.id);
        sortedNodes[4].id.should.equal(outputSummer.id);
        sortedNodes[5].id.should.equal(outputNode.id);
      });

      it('Should set correct nodePos on nodes', () => {
        sortedNodes[0].nodePos.should.equal(offset);
        sortedNodes[5].nodePos.should.equal(offset + 5);
      });

      it('Should set correct nodePos on parameters', () => {
        let inputSummer = sortedNodes[3];
        let independent1 = sortedNodes[2];
        let independent2 = sortedNodes[1];

        inputSummer.params[0].nodePos.should.equal(independent1.nodePos);
        inputSummer.params[1].nodePos.should.equal(independent2.nodePos);
      });
    });

    describe('Graph with loop:', function () {
      let result = prepareNetForSerialization(nodesForSortingWithLoop);
      let sortedNodes = result.nodes;
      let offset = config.graph.numberOfInputs + result.constants.length;

      it('Should sort nodes correctly', function () {
        let outputNode = nodesForSorting['0'];
        let independent2 = nodesForSorting['1'];
        let independent1 = nodesForSorting['2'];
        let delayNode = nodesForSorting['3'];

        sortedNodes[0].id.should.equal(independent1.id);
        sortedNodes[1].id.should.equal(independent2.id);
        sortedNodes[2].id.should.equal(delayNode.id);
        sortedNodes[3].id.should.equal(outputNode.id);
      });
    });

    describe('Is valid', function() {
      it('should be false if one node is invalid', function() {

        let invalidNode = nodesWithInvalid['0'];
        let validNode = nodesWithInvalid['1'];

        let isValid = isNetValid(nodesWithInvalid);

        invalidNode.valid.should.equal(false);
        validNode.valid.should.equal(true);
        isValid.should.equal(false);

      });

      it('should be true if all nodes are valid', function() {

        let isValid = isNetValid(nodesWithConstants);

        _.each(nodesWithConstants, node => {
          node.valid.should.equal(true);
        });

        isValid.should.equal(true);
      });

    });
  });

  describe('Virtual inputs:', function () {

    let result = prepareNetForSerialization(nodesWithVirtualInputs, virtualInputsForNodeTesting);
    let virtualInputs = result.virtualInputs;
    let nodes = result.nodes;

    it('Should extract pure virtual inputs', function () {
      virtualInputs.length.should.equal(2);
      virtualInputs[0].should.equal(pureVirtual1.id);
      virtualInputs[1].should.equal(pureVirtual2.id);
      // pureVirtual3 is unreachable and should not be part of the result
      // virtualWithPhysical is, as the name implies, connected to a panel controller should not be part of the result
    });

    it('Should set correct index for virtual inputs', function () {
      // virtual inputs
      let firstVirtualInputIndex = config.graph.numberOfInputs;
      nodes[0].params[0].nodePos.should.equal(firstVirtualInputIndex); // virtual
      nodes[0].params[1].nodePos.should.equal(0); // replaced with physical
      nodes[1].params[0].nodePos.should.equal(firstVirtualInputIndex); // virtual, duplicate
      nodes[1].params[1].nodePos.should.equal(firstVirtualInputIndex + 1); // virtual
    });

  });
});



// TODO: Test input og virtual input-params. Disse ser ut til å ikke bli byttet ut.
// TODO: Test constants, ser ikke ut som det er 16bitsverdien som settes.

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