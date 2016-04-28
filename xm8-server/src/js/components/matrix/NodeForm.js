// TODO: REset value, unit and input type. Currently the reset does not clear type and unit.

import React from 'react';
import { connect } from 'react-redux';

import nodeTypes from '../../../../shared/matrix/NodeTypes.js';
import NodeFormComponent from './NodeFormComponent'

const mapStateToProps = (state, ownProps) => {
  let node = state.nodes[ownProps.nodeId]; 
  let nodeType = nodeTypes.idMap[node.type];  

  return {
    nodeId: ownProps.nodeId,
    nodeTypeId: nodeType.id
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
    }
  }
}

const NodeForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(NodeFormComponent);

export default NodeForm;

/*
        <p>             
          {
            nodeType.params.map(function(parameter){
            return <NodeParameterForm 
                      key={parameter.id} 
                      parameterDefinition={parameter} 
                      parameterSettings={node.params[parameter.id]} 
                      onParameterTypeChange={
                        (paramId, paramType, paramUnit) => {
                          that.handleParameterTypeChange(node.id, paramId, paramType, paramUnit);
                        }
                      }
                      onParameterUnitChange={
                        (paramId, paramUnit) => {
                          that.handleParameterUnitChange(node.id, paramId, paramUnit);
                        }
                      }
                      onParameterValueChange={
                        (paramId, paramValue) => {
                          that.handleParameterValueChange(node.id, paramId, paramValue);
                        }
                      }/> 
          })}
        </p> 


  handleParameterTypeChange(nodeId, paramId, paramType, paramUnit){ 
    this.store.dispatch({
      type: 'CHANGE_NODE_PARAM_TYPE',      
      nodeId: nodeId,
      paramId: paramId,
      paramType: paramType,
      paramUnit: paramUnit
    });
  }

  handleParameterUnitChange(nodeId, paramId, paramUnit){
    this.store.dispatch({
      type: 'CHANGE_NODE_PARAM_UNIT',      
      nodeId: nodeId,
      paramId: paramId,
      paramUnit: paramUnit
    });   
  }

  handleParameterValueChange(nodeId, paramId, paramValue){ 
    this.store.dispatch({
      type: 'CHANGE_NODE_PARAM_VALUE',      
      nodeId: nodeId,
      paramId: paramId,
      paramValue: paramValue
    });  
  }
         */
