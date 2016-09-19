import store from '../../../core/state/store';
import chai from 'chai';
import { expect } from 'chai';

import { getNode } from '../../../core/state/selectors';
import { resetGraph,
  createNewNode, changeNodeType,
  changeNodeParamType, changeNodeParamValue, changeNodeParamUnit,
  createNewLink, deleteLink } from '../../../shared/state/actions/nodes';
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
  });

  describe('Setting node type', function () {

    before(function() {
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

  describe('Setting param type', function () {

    before(function() {
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

    before(function() {
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
    // TODO: Delete from consumers if changing link value
  });

  describe('Setting param unit', function () {

    before(function() {
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

    before(function() {
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

  describe('Deleting link', function () {

    before(function() {
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


  //TODO: Set node name
  //TODO: Node move
  //TODO: Delete input
  //TODO: Delete node should remove from consumers
  //TODO: Delete node should remove from params
  //TODO: case types.CHANGE_LINK_NAME:
  //TODO: case types.TOGGLE_LINK_NAME_IN_GRAPH:

});