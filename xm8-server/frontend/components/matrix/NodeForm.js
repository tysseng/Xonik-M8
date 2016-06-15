// TODO:  TOGGLE DESCRIPTION

import React from 'react'
import _ from 'lodash';

import NodeTypeDropdown from './NodeTypeDropdown'
import NodeParameterForm from './NodeParameterForm'

import nodeTypes from '../../../shared/matrix/NodeTypes.js';

const NodeFormComponent = ({ node, nodes, onNodeNameChange, onNodeTypeChange, onParameterTypeChange, onParameterValueChange, onParameterUnitChange, onCloseDialog }) => {

  if(!node){
    return null;
  }
  let nodeType = nodeTypes.idMap[node.type];  

  return (
    <form className="nodeForm">
      <div className="heading">Node 
      <img className="miniicon" src="img/icons/cancel.svg" onClick={onCloseDialog}/></div>
      <div className="nodeBlock">
        <label htmlFor="nodeName">Name</label>     
        <input id="nodeName" type="text" onChange={(e) => onNodeNameChange(node.id, e.target.value)} value={node.name}/>

        <NodeTypeDropdown id="nodeType" value={node.type} 
          onNodeTypeChange={
            (typeId) => { 
              onNodeTypeChange(node.id, typeId);
            }
        }/>
      </div>
      <div className="paramBlock">            
        {        
          nodeType.params.map((parameterDefinition) => {
            
          let paramId = parameterDefinition.id;
          let parameter = node.params[paramId];

          return <NodeParameterForm 
            key={paramId} 
            name={parameterDefinition.name}
            parameter={parameter}
            currentnode={node}
            nodes={nodes}
            onTypeChange={(typeId) => onParameterTypeChange(node.id, paramId, typeId)}
            onValueChange={(value) => onParameterValueChange(node.id, paramId, parameter.type, value)}
            onUnitChange={(unit) => onParameterUnitChange(node.id, paramId, unit)}/> 
        })}
      </div>     
    </form>
  )

}

export default NodeFormComponent;