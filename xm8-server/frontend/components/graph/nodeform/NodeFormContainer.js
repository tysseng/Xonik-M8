import React from 'react';
import { connect } from 'react-redux';

import { selectNode, changeNodeName, changeNodeType, changeNodeResult, changeNodeResultUnit, changeNodeParamType, changeNodeParamValue, changeNodeParamUnit } from '../../../../shared/state/actions/nodes';
import { getNodes, getGuiPatchview } from '../../../state/selectors';

import NodeForm from './NodeForm'


const mapStateToProps = (state, ownProps) => {

  let nodes = getNodes(state).toJS();
  let selectedNodeId = getGuiPatchview(state).get('selectedNode');
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
    onNodeResultChange: (nodeId, typeId) => {
      dispatch(changeNodeResult(nodeId, typeId));
    },
    onResultUnitChange: (nodeId, typeId) => {
      dispatch(changeNodeResultUnit(nodeId, typeId));
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
