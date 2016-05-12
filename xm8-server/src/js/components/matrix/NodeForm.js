import React from 'react'
import _ from 'lodash';

import NodeTypeDropdown from './NodeTypeDropdown'
import NodeParameterForm from './NodeParameterForm'

import nodeTypes from '../../../../shared/matrix/NodeTypes.js';

const NodeFormComponent = ({ node, nodes, onNodeNameChange, onNodeTypeChange, onParameterTypeChange, onParameterValueChange, onParameterUnitChange }) => {
  let nodeType = nodeTypes.idMap[node.type];  

  return <form>
    <h2>{node.name}</h2>
    <h3>General</h3>
    <p>
      <label htmlFor="nodeNamee">Name</label>     
      <input id="nodeNamee" type="text" onChange={(e) => onNodeNameChange(node.id, e.target.value)} value={node.name}/>
    </p>
    <p> 
      <label htmlFor="nodeType">Node type</label>          
      <NodeTypeDropdown id="nodeType" value={node.type} 
        onNodeTypeChange={
          (typeId) => { 
            onNodeTypeChange(node.id, typeId);
          }
      }/>
    </p>
    <p>
      Description: {nodeType.description}
    </p>

    <h3>Parameters</h3>
    <p>             
      {        
        nodeType.params.map((parameterDefinition) => {
          
        let paramId = parameterDefinition.id;
        console.log(node);
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
    </p>     
  </form>

}

export default NodeFormComponent;