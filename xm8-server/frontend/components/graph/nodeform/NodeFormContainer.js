import React from 'react';
import { connect } from 'react-redux';

import { selectNode, changeNodeName, changeNodeType, changeNodeParamType, changeNodeParamValue, changeNodeParamUnit } from '../../../../shared/state/actions/nodes';
import nodeTypes from '../../../../shared/graph/NodeTypes.js';

import NodeForm from './NodeForm'


const mapStateToProps = (state, ownProps) => {

  let nodes = state.nodes.get('nodes').toJS();
  let selectedNodeId = state.graph.get('selectedNode');
  let node = nodes[selectedNodeId];

  return {
    node, 
    nodes
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNodeNameChange: (nodeId, value) => {
      dispatch(changeNodeName(nodeId, value));
    },
    onNodeTypeChange: (nodeId, typeId) => {
      dispatch(changeNodeType(nodeId, typeId));
    },
    onParameterTypeChange: (nodeId, paramId, paramType) => { 
      dispatch(changeNodeParamType(nodeId, paramId, paramType));
    },
    onParameterValueChange: (nodeId, paramId, paramType, paramValue) => { 
      dispatch(changeNodeParamValue(nodeId, paramId, paramType, paramValue));
    },
    onParameterUnitChange: (nodeId, paramId, paramUnit) => {
      dispatch(changeNodeParamUnit(nodeId, paramId, paramUnit));  
    },
    onCloseDialog: () => {
      dispatch(selectNode(''));
    }    
  }
}

const NodeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeForm);

export default NodeFormContainer;
