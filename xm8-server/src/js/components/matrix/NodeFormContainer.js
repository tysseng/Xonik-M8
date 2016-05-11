import React from 'react';
import { connect } from 'react-redux';

import { changeNodeType, changeNodeParamType, changeNodeParamValue, changeNodeParamUnit } from '../../../../shared/state/actions';
import NodeForm from './NodeForm'

import nodeTypes from '../../../../shared/matrix/NodeTypes.js';


const mapStateToProps = (state, ownProps) => {
  let node = state.nodes.toJS()[ownProps.nodeId];
  
  return {
    node
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
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
    }
  }
}

const NodeFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeForm);

export default NodeFormContainer;
