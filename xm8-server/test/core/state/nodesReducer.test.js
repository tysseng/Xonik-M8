import store from '../../../core/state/store';
import chai from 'chai';
import { getNode } from '../../../core/state/selectors';
import { resetGraph, createNewNode, changeNodeType, changeNodeParamType,
  changeNodeParamValue, changeNodeParamUnit, createNewLink } from '../../../shared/state/actions/nodes';
import { map as nodeTypesMap } from '../../../shared/graph/NodeTypes';
import { map as paramTypesMap } from '../../../shared/graph/ParameterTypes';

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

  describe('Setting type', function () {

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

    it('should remove node from any consumers when changing type', function () {
      // initial type
      store.dispatch(changeNodeType('0', nodeTypesMap.INVERT.id, voiceGroupId));

      // node to consume as invert value parameter
      store.dispatch(createNewNode(voiceGroupId));
      store.dispatch(changeNodeType('1', nodeTypesMap.INVERT.id, voiceGroupId));

      // link nodes
      store.dispatch(createNewLink('1', '0', '0', voiceGroupId));

      let node = getNode(voiceGroupId, '0').toJS();
      console.log(node);
      let node2 = getNode(voiceGroupId, '1').toJS();
      console.log(node2);

    // TODO: Remove from consumers when changing type

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

    it('should add consuming node to consumer array of consumed node ', function () {

      // link nodes
      store.dispatch(createNewLink('1', '0', '2', voiceGroupId));
      let consumedNode = getNode(voiceGroupId, '1').toJS();

      // id is from-to-paramid
      let link = consumedNode.consumers['1-0-2'];
      link.from.should.equal('1');
      link.to.should.equal('0');
      link.toParam.should.equal('2');
    });

    it('should add consumed node to parameter of consuming node ', function () {

      // link nodes
      store.dispatch(createNewLink('1', '0', '2', voiceGroupId));
      let consumingNode = getNode(voiceGroupId, '0').toJS();

      // id is from-to-paramid
      let consumingParam = consumingNode.params['2'];
      consumingParam.type.should.equal(paramTypesMap.LINK.id);

      let link = consumingParam.value;
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

    // TODO: Remove from consumers when deleting link


  });

});