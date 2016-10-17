import chai from 'chai';
import _ from 'lodash';

import config from '../../../shared/config';
import { outputsById } from '../../../shared/graph/Outputs';
import { panelControllersById } from '../../../shared/graph/PanelControllers';
import { nodeTypesById } from '../../../shared/graph/NodeTypes';

import { prepareNetForSerialization, isNetValid, convertParamTo16BitSigned } from '../../../core/patch/preparer';
import nodesWithInvalid from './mockedNodes/nodes-with-invalid';
import nodesWithUnreachable from './mockedNodes/nodes-with-unreachable';
import nodesWithResult from './mockedNodes/nodes-with-result';
import nodesWithLinks from './mockedNodes/nodes-with-links';
import nodesWithConstants from './mockedNodes/nodes-with-constants';
import nodesWithParamsInUse from './mockedNodes/nodes-with-params-in-use';
import nodesForSorting from './mockedNodes/nodes-for-sorting';
import nodesForSortingWithLoop from './mockedNodes/nodes-for-sorting-with-loop';
import nodesWithVirtualInputs from './mockedNodes/nodes-with-virtual-inputs';
import nodesWithPhysicalInputs from './mockedNodes/nodes-with-physical-inputs';
import nodesWithNodeTypeHwId from './mockedNodes/nodes-with-node-type-hw-id';
import virtualInputsForNodeTesting, { pureVirtual1, pureVirtual2 } from './mockedInputs/virtual-inputs-for-node-testing';

chai.should();

describe('Patch preparation:', function() {

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

  describe('Constant conversion:', function () {
    it('should convert param using unit converter', function () {
      let param = {
        unit: 'PERCENTAGE',
        value: '10'
      }
      convertParamTo16BitSigned(param).should.equal(3276);
    });

    it('should cap value at max positive signed 16bit int', function () {
      let param = {
        unit: 'PERCENTAGE',
        value: '101'
      }
      convertParamTo16BitSigned(param).should.equal(32767);
    });

    it('should cap value at min positive signed 16bit int', function () {
      let param = {
        unit: 'PERCENTAGE',
        value: '-101'
      }
      convertParamTo16BitSigned(param).should.equal(-32768);
    });
  });

  describe('Constant extraction:', function () {

    let result = prepareNetForSerialization(nodesWithConstants);
    let constants = result.constants;

    it('should have extracted 4 constants', function () {
      constants.length.should.equal(4);
    });

    it('should convert constant from unit to 16bit signed int ', function () {
      var nodeParam0 = nodesWithConstants['1'].params['0'];
      let pos0 = nodeParam0.nodePos;
      let convertedValue0 = convertParamTo16BitSigned(nodeParam0);

      constants[pos0 - config.graph.numberOfInputs].should.equal(convertedValue0);
    });

    it('should have calculated correct positions for constants', function () {

      var nodeParam0 = nodesWithConstants['1'].params['0'];
      var nodeParam1 = nodesWithConstants['1'].params['1'];
      var nodeParam2 = nodesWithConstants['0'].params['1'];

      let pos0 = nodeParam0.nodePos;
      let pos1 = nodeParam1.nodePos;
      let pos2 = nodeParam2.nodePos;

      let convertedValue0 = convertParamTo16BitSigned(nodeParam0);
      let convertedValue1 = convertParamTo16BitSigned(nodeParam1);
      let convertedValue2 = convertParamTo16BitSigned(nodeParam2);

      // Three constants
      constants[pos0 - config.graph.numberOfInputs].should.equal(convertedValue0);
      constants[pos1 - config.graph.numberOfInputs].should.equal(convertedValue1);
      constants[pos2 - config.graph.numberOfInputs].should.equal(convertedValue2);
    });

    it('should have calculated correct position for output id and use hwId instead of id', function () {

      // Output node's 'output to' parameter, value is VCO1 pitch hwId.
      let pos3 = nodesWithConstants['2'].params['1'].nodePos;
      constants[pos3 - config.graph.numberOfInputs].should.equal(outputsById.OUT_VCO_1_PITCH.hwId)
    });

  });

  describe('Result conversion:', function () {

    let result = prepareNetForSerialization(nodesWithResult);
    let nodes = result.nodes;

    it('should convert result value based on result units', function () {
      nodes[0].result.value.should.equal(13107);
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
    let virtualInputPositions = result.virtualInputPositions;
    let nodes = result.nodes;

    it('Should extract pure virtual inputs', function () {
      Object.keys(virtualInputPositions).length.should.equal(2);
      virtualInputPositions[pureVirtual1.id].should.equal(64);
      virtualInputPositions[pureVirtual2.id].should.equal(65);
      // pureVirtual3 is unreachable and should not be part of the result
      // virtualWithPhysical is, as the name implies, connected to a panel controller should not be part of the result
    });

    it('Should set correct index for virtual inputs', function () {
      // virtual inputs
      let firstVirtualInputIndex = config.graph.numberOfInputs;
      nodes[0].params[0].nodePos.should.equal(firstVirtualInputIndex); // virtual
      nodes[0].params[1].nodePos.should.equal(panelControllersById.PC_OSC_1_SQUARE.hwId); // replaced with physical
      nodes[1].params[0].nodePos.should.equal(firstVirtualInputIndex); // virtual, duplicate
      nodes[1].params[1].nodePos.should.equal(firstVirtualInputIndex + 1); // virtual
    });
  });

  describe('Physical inputs:', function () {

    let result = prepareNetForSerialization(nodesWithPhysicalInputs, virtualInputsForNodeTesting);
    let nodes = result.nodes;

    it('Should set correct index for physical inputs', function () {
      nodes[0].params[0].nodePos.should.equal(panelControllersById.PC_FILTER_1_ENV_RELEASE.hwId);
      nodes[0].params[1].nodePos.should.equal(panelControllersById.PC_FILTER_1_CUTOFF.hwId);
    });
  });


  describe('Node type:', function () {
    let result = prepareNetForSerialization(nodesWithNodeTypeHwId, virtualInputsForNodeTesting);
    let nodes = result.nodes;

    it('Should set hw id from NodeType as typeHwId on node', function () {
      nodes[0].typeHwId.should.equal(nodeTypesById.SUM.hwId);
    });
  });
});
