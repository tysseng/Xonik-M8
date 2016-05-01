import React from 'react'
import _ from 'lodash';

import NodeTypeDropdown from './NodeTypeDropdown'
import NodeParameterForm from './NodeParameterForm'

import nodeTypes from '../../../../shared/matrix/NodeTypes.js';

const NodeFormComponent = ({ node, onNodeTypeChange, onParameterTypeChange, onParameterValueChange, onParameterUnitChange }) => {
  let nodeType = nodeTypes.idMap[node.type];  

  return <form>
    <h2>Node {node.id}</h2>
    <h3>General</h3>
    <p>
      <label htmlFor="nodeType">Node type</label>          
      <NodeTypeDropdown id="nodeType" value={node.type} 
        onNodeTypeChange={
          (typeId) => { 
            onNodeTypeChange(node.id, typeId);
          }
      }/>
    </p>

    <h3>Parameters</h3>
    <p>             
      {        
        nodeType.params.map((parameterDefinition) => {
          
        let paramId = parameterDefinition.id;
        let parameter = node.params[paramId];

        return <NodeParameterForm 
          key={paramId} 
          name={parameterDefinition.name}
          value={parameter.value} 
          type={parameter.type}
          unit={parameter.unit}
          onTypeChange={(typeId) => onParameterTypeChange(node.id, paramId, typeId)}
          onValueChange={(value) => onParameterValueChange(node.id, paramId, value)}
          onUnitChange={(unit) => onParameterUnitChange(node.id, paramId, unit)}/> 
      })}
    </p>     
  </form>

}

export default NodeFormComponent;