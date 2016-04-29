// TODO: REset value, unit and input type. Currently the reset does not clear type and unit.

import React from 'react';
import { connect } from 'react-redux';

import nodeTypes from '../../../../shared/matrix/NodeTypes.js';
import NodeFormComponent from './NodeFormComponent'

const mapStateToProps = (state, ownProps) => {
  let node = state.nodes[ownProps.nodeId]; 
  let nodeType = nodeTypes.idMap[node.type];  

  return {
    node: node,
    nodeType: nodeType
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onNodeTypeChange: (nodeId, typeId) => {
      console.log(nodeId, typeId)
      dispatch({
        type: 'CHANGE_NODE_TYPE',
        nodeId: nodeId,
        typeId: typeId
      });
    },
    onParameterTypeChange: (nodeId, paramId, paramType) => { 
      dispatch({
        type: 'CHANGE_NODE_PARAM_TYPE',      
        nodeId: nodeId,
        paramId: paramId,
        paramType: paramType
      });
    },
    onParameterValueChange: (nodeId, paramId, paramValue) => { 

      dispatch({
        type: 'CHANGE_NODE_PARAM_VALUE',      
        nodeId: nodeId,
        paramId: paramId,
        paramValue: paramValue
      });  
    },
    onParameterUnitChange: (nodeId, paramId, paramUnit) => {
      dispatch({
        type: 'CHANGE_NODE_PARAM_UNIT',      
        nodeId: nodeId,
        paramId: paramId,
        paramUnit: paramUnit
      });   
    }
  }
}

const NodeForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeFormComponent);

export default NodeForm;
