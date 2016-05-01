import React from 'react';
import { connect } from 'react-redux';

import { changeNodeType, changeNodeParamType, changeNodeParamValue , changeNodeParamUnit } from '../../actions';
import NodeForm from './NodeForm'

import nodeTypes from '../../../../shared/matrix/NodeTypes.js';


const mapStateToProps = (state, ownProps) => {
  let node = state.nodes[ownProps.nodeId]; 
  let nodeType = node.type !== "-1" ? nodeTypes.idMap[node.type] : {id: "-1", params: []};  
  console.log(nodeType)

  return {
    node: node,
    nodeType: nodeType
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
    onParameterValueChange: (nodeId, paramId, paramValue) => { 
      dispatch(changeNodeParamValue(nodeId, paramId, paramValue));
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
