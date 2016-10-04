import chai from 'chai';
import { expect } from 'chai';

import store from '../../../core/state/store';
import { getNode } from '../../../core/state/selectors';
import { resetGraph,
  createNewNode, changeNodeType, changeNodeName, moveNode, deleteNode,
  changeNodeParamType, changeNodeParamValue, changeNodeParamUnit,
  createNewLink, deleteLink, changeLinkName, toggleLinkNameInGraph, changeNodeResult, changeNodeResultUnit } from '../../../shared/state/actions/nodes';
import { deleteInput } from '../../../shared/state/actions/inputs';

import { map as nodeTypesMap } from '../../../shared/graph/NodeTypes';
import { map as paramTypesMap } from '../../../shared/graph/ParameterTypes';
import { unitsById } from '../../../shared/graph/ParameterUnits';

chai.should();

describe('Nodes reducer:', function() {

  //TODO: Remove this, let load persisted be configurable
  let voiceGroupId = '0';
  store.dispatch(resetGraph(voiceGroupId));

  describe('Adding new node', function () {

    store.dispatch(resetGraph(voiceGroupId));
    store.dispatch(createNewNode(voiceGroupId));
    let node = getNode(voiceGroupId, '0').toJS();

    it('should have correct id', function () {
      node.id.should.equal('0');
    });

    it('should have default name', function () {
      node.name.should.equal('Node 0');
    });

    it('should have no type', function () {
      node.type.should.equal('-1');
    });

    it('should not be valid', function () {
      node.valid.should.equal(false);
    });

    it('should set initial position', function () {
      node.vis.x.should.equal(10);
      node.vis.y.should.equal(10);
    });
  });

  describe('Setting node type', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
    });

    it('should set initial type', function () {
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();

      node.type.should.equal(nodeTypesMap.INVERT.id);
    });

    it('should set default properties when setting type', function () {
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();

      node.params.length.should.equal(nodeTypesMap.INVERT.params.length);
    });

    it('should replace existing type type', function () {
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.SUM.id, voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();
      node.type.should.equal(nodeTypesMap.SUM.id);
    });

    it('should clear properties when changing type', function () {
      // initial type
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.CONSTANT.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.CONSTANT.id, 5, voiceGroupId));

      // change type
      store.dispatch(changeNodeType('0', nodeTypesMap.SUM.id, voiceGroupId));

      let node = getNode(voiceGroupId, '0').toJS();

      node.params['0'].type.should.equal('');
      node.params['0'].value.should.equal('');
      node.params['0'].unit.should.equal('');
    });

    it('should remove node from consumers when changing type', function () {
      // initial type
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));

      // node to consume as invert value parameter
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));

      // link nodes
      store.dispatch(createNewLink('1', '0', '0', voiceGroupId));

      // change node type, should clear consumer
      store.dispatch(changeNodeType('0', nodeTypesMap.SUM.id, voiceGroupId));

      let fromNode = getNode(voiceGroupId, '1').toJS();
      expect(fromNode.consumers['1-0-0']).to.equal(undefined);
    });
  });

  describe('Renaming node', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
    });

    it('should set node name', function () {
      store.dispatch(changeNodeName('0', "New node name", voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();

      node.name.should.equal("New node name");
    });
  });

  describe('Move node', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
    });

    it('should set new coordinates', function () {
      store.dispatch(moveNode('0', 30, 20, voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();

      node.vis.x.should.equal(30);
      node.vis.y.should.equal(20);
    });
  });

  describe('Delete node', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
    });

    it('should remove node', function () {
      store.dispatch(deleteNode('0', voiceGroupId));

      let node = getNode(voiceGroupId, '0');
      expect(node).to.equal(undefined);
    });

    it('should remove to-node from consumers', function () {

      // node to consume as invert value parameter
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));

      // link nodes
      store.dispatch(createNewLink('1', '0', '0', voiceGroupId));

      // delete to-node, should clear consumer
      store.dispatch(deleteNode('0', voiceGroupId));

      let fromNode = getNode(voiceGroupId, '1').toJS();
      expect(fromNode.consumers['1-0-0']).to.equal(undefined);
    });

    it('should remove from-node from parameters', function () {

      // node to consume as invert value parameter
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));

      // link nodes
      store.dispatch(createNewLink('1', '0', '0', voiceGroupId));

      // delete from-node, should remove parameter value from to-node
      store.dispatch(deleteNode('1', voiceGroupId));

      let toNode = getNode(voiceGroupId, '0').toJS();
      toNode.params['0'].value.should.equal('');
    });

    it('should leave parameter type unchanged when deleting from-node', function () {

      // node to consume as invert value parameter
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));

      // link nodes
      store.dispatch(createNewLink('1', '0', '0', voiceGroupId));

      // delete from-node, should remove parameter value from to-node
      store.dispatch(deleteNode('1', voiceGroupId));

      let toNode = getNode(voiceGroupId, '0').toJS();
      toNode.params['0'].type.should.equal(paramTypesMap.LINK.id);
    });
  });

  describe('Setting param type', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
    });

    it('should set param type', function () {
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.INPUT.id, voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();

      node.params['0'].type.should.equal(paramTypesMap.INPUT.id);
    });

    it('should set units to fraction if type is constant', function () {
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.CONSTANT.id, voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();

      node.params['0'].unit.should.equal(unitsById.FRACTION.id);
    });

    it('should clear param value and unit when param type changes', function () {
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.CONSTANT.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.CONSTANT.id, 123, voiceGroupId));
      store.dispatch(changeNodeParamUnit('0', '0', unitsById.CENTS.id, voiceGroupId));

      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.INPUT.id, voiceGroupId));

      let node = getNode(voiceGroupId, '0').toJS();

      node.params['0'].type.should.equal(paramTypesMap.INPUT.id);
      node.params['0'].value.should.equal('');
      node.params['0'].unit.should.equal('');
    });

    it('should remove node from consumers when changing param type', function () {

      // node to consume as invert value parameter
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));

      // link nodes
      store.dispatch(createNewLink('1', '0', '0', voiceGroupId));

      // change param type, should clear consumer
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.CONSTANT.id, voiceGroupId));

      let fromNode = getNode(voiceGroupId, '1').toJS();
      expect(fromNode.consumers['1-0-0']).to.equal(undefined);
    });
  });

  describe('Setting param value', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
    });

    it('should set param value', function () {
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.CONSTANT.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.CONSTANT.id, 123, voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();

      node.params['0'].value.should.equal(123);
    });

    it('should create link if type is link', function () {
      // node to link from
      store.dispatch(createNewNode(voiceGroupId));

      // create link
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.LINK.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.LINK.id, '1', voiceGroupId));

      let toNode = getNode(voiceGroupId, '0').toJS();

      // id is from-to-paramId
      let toParam = toNode.params['0'];
      let link = toParam.value;
      link.from.should.equal('1');
      link.to.should.equal('0');
      link.toParam.should.equal('0');
    });


    it('should add to-node to consumers of from-node type is link', function () {
      // node to link from
      store.dispatch(createNewNode(voiceGroupId));

      // create link
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.LINK.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.LINK.id, '1', voiceGroupId));

      let fromNode = getNode(voiceGroupId, '1').toJS();

      // id is from-to-paramid
      let link = fromNode.consumers['1-0-0'];
      link.from.should.equal('1');
      link.to.should.equal('0');
      link.toParam.should.equal('0');
    });

    it('should delete to-node from consumers of from-node when clearing value', function () {
      // node to link from
      store.dispatch(createNewNode(voiceGroupId));

      // create link
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.LINK.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.LINK.id, '1', voiceGroupId));

      // delete parameter should clear consumer
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.LINK.id, '', voiceGroupId));

      let fromNode = getNode(voiceGroupId, '1').toJS();

      expect(fromNode.consumers['1-0-0']).to.equal(undefined);
    });

    it('should delete to-node from consumers of from-node when changing value', function () {
      // node to link from
      store.dispatch(createNewNode(voiceGroupId));

      // node to change link to
      store.dispatch(createNewNode(voiceGroupId));

      // create link
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.LINK.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.LINK.id, '1', voiceGroupId));

      // delete parameter should clear consumer
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.LINK.id, '2', voiceGroupId));

      let fromNode = getNode(voiceGroupId, '1').toJS();
      expect(fromNode.consumers['1-0-0']).to.equal(undefined);
    });
  });

  describe('Deleting virtual input', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.VIRTUALINPUT.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.VIRTUALINPUT.id, 'virt|123', voiceGroupId));
    });

    it('should clear any parameter using that virtual input', function () {

      store.dispatch(deleteInput('virt|123', voiceGroupId));

      let node = getNode(voiceGroupId, '0').toJS();
      node.params['0'].value.should.equal('');
    });
  });

  describe('Setting param unit', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));
      store.dispatch(changeNodeParamType('0', '0', paramTypesMap.CONSTANT.id, voiceGroupId));
      store.dispatch(changeNodeParamValue('0', '0', paramTypesMap.CONSTANT.id, 123, voiceGroupId));
    });

    it('should set param unit', function () {
      store.dispatch(changeNodeParamUnit('0', '0', unitsById.CENTS.id, voiceGroupId));
      let node = getNode(voiceGroupId, '0').toJS();

      node.params['0'].unit.should.equal(unitsById.CENTS.id);
    });
  });

  describe('Linking nodes', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.SUM.id, voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));
    });

    it('should add to-node to consumer array of from-node ', function () {

      // link nodes
      store.dispatch(createNewLink('1', '0', '2', voiceGroupId));
      let fromNode = getNode(voiceGroupId, '1').toJS();

      // id is from-to-paramid
      let link = fromNode.consumers['1-0-2'];
      link.from.should.equal('1');
      link.to.should.equal('0');
      link.toParam.should.equal('2');
    });

    it('should add from-node to parameter of to-node ', function () {

      // link nodes
      store.dispatch(createNewLink('1', '0', '2', voiceGroupId));
      let toNode = getNode(voiceGroupId, '0').toJS();

      // id is from-to-paramId
      let toParam = toNode.params['2'];
      toParam.type.should.equal(paramTypesMap.LINK.id);

      let link = toParam.value;
      link.from.should.equal('1');
      link.to.should.equal('0');
      link.toParam.should.equal('2');
    });

    it('should set default name on link', function () {

      // link nodes
      store.dispatch(createNewLink('1', '0', '2', voiceGroupId));
      let consumingNode = getNode(voiceGroupId, '0').toJS();
      let consumingParam = consumingNode.params['2'];

      let link = consumingParam.value;
      link.name.should.equal('');
    });

    it('should set default name visibility on link', function () {

      // link nodes
      store.dispatch(createNewLink('1', '0', '2', voiceGroupId));
      let consumingNode = getNode(voiceGroupId, '0').toJS();
      let consumingParam = consumingNode.params['2'];

      let link = consumingParam.value;
      link.showNameInGraph.should.equal(true);
    });
  });

  describe('Link name changes', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.SUM.id, voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));
      store.dispatch(createNewLink('1', '0', '2', voiceGroupId));
    });

    it('should change the name on link', function () {

      // link nodes
      store.dispatch(changeLinkName('0', '2', 'New link name', voiceGroupId));
      let consumingNode = getNode(voiceGroupId, '0').toJS();
      let consumingParam = consumingNode.params['2'];

      let link = consumingParam.value;
      link.name.should.equal('New link name');
    });

    it('should toggle name visibility', function () {

      // link nodes
      store.dispatch(toggleLinkNameInGraph('0', '2', false, voiceGroupId));
      let consumingNode = getNode(voiceGroupId, '0').toJS();
      let consumingParam = consumingNode.params['2'];

      let link = consumingParam.value;
      link.showNameInGraph.should.equal(false);
    });
  });

  describe('Deleting link', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.SUM.id, voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));
      store.dispatch(createNewLink('1', '0', '2', voiceGroupId));
    });

    it('should clear property value from to-node', function () {
      store.dispatch(deleteLink('1-0-2', voiceGroupId));

      let toNode = getNode(voiceGroupId, '0').toJS();
      toNode.params['2'].value.should.equal('');
      toNode.params['2'].unit.should.equal('');
    });

    it('should leave param type', function () {
      store.dispatch(deleteLink('1-0-2', voiceGroupId));

      let toNode = getNode(voiceGroupId, '0').toJS();
      toNode.params['2'].type.should.equal(paramTypesMap.LINK.id);
    });

    it('should remove to-node from consumer list', function () {
      store.dispatch(deleteLink('1-0-2', voiceGroupId));
      let fromNode = getNode(voiceGroupId, '1').toJS();
      expect(fromNode.consumers['1-0-2']).to.equal(undefined);
    });
  });

  describe('Result manipulation', function () {

    beforeEach(function() {
      store.dispatch(resetGraph(voiceGroupId));
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('0', nodeTypesMap.DELAY_LINE.id, voiceGroupId));
      store.dispatch(changeNodeResult('0', 10, voiceGroupId));
      store.dispatch(changeNodeResultUnit('0', unitsById.OCTAVES.id, voiceGroupId));
    });

    it('should have set node result', function () {
      let resultNode = getNode(voiceGroupId, '0').toJS();
      resultNode.result.value.should.equal(10);
      resultNode.result.unit.should.equal(unitsById.OCTAVES.id);
    });

    it('should clear result when changing node type', function () {
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));

      let resultNode = getNode(voiceGroupId, '0').toJS();
      resultNode.result.value.should.equal('');
      resultNode.result.unit.should.equal(unitsById.FRACTION.id);
    });
  });

  // IN OUTPUTS REDUCER
  //TODO: Delete node should update output collition detection
  //TODO: Change node type should update output collision detection
  //TODO: Change param type should update output collision detection
  //TODO: Change param value should update output collision detection
});