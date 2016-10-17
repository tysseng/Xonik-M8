// TODO:  TOGGLE DESCRIPTION

import React from 'react';

import NodeTypeDropdown from './NodeTypeDropdown';
import NodeParameterForm from './NodeParameterForm';
import ParameterUnitDropdown from './ParameterUnitDropdown';
import MiniIcon from '../../framework/MiniIcon';

import nodeTypes from '../../../../shared/graph/NodeTypes.js';

const NodeFormComponent = ({ node, nodes, onNodeNameChange, onNodeTypeChange, onNodeResultChange, onResultUnitChange, onParameterTypeChange, onParameterValueChange, onParameterUnitChange, onCloseDialog }) => {

  if(!node){
    return null;
  }
  let nodeType = nodeTypes.nodeTypesById[node.type];

  return (

    <form className="nodeForm configPane">
      <div className="heading">Node<MiniIcon label="Close" icon="cancel.svg" onClick={onCloseDialog}/></div>

      <div className='contents'>
        <div className="nodeBlock">
          <label htmlFor="nameOfNode">Name</label>           
          <input id="nameOfNode" type="text" onChange={(e) => onNodeNameChange(node.id, e.target.value)} value={node.name}/>

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
              parameterDefinition={parameterDefinition}
              parameter={parameter}
              currentnode={node}
              nodes={nodes}
              onTypeChange={(typeId) => onParameterTypeChange(node.id, paramId, typeId)}
              onValueChange={(value) => onParameterValueChange(node.id, paramId, parameter.type, value)}
              onUnitChange={(unit) => onParameterUnitChange(node.id, paramId, unit)}/> 
          })}
        </div>
        { nodeType.maySetInitialResult && (
          <div className="resultBlock">
            <label htmlFor="initialResult">Initial result</label>
            <span>
              <input id="initialResult" className="resultValue" type="text" onChange={(e) => onNodeResultChange(node.id, e.target.value)} value={node.result.value}/>
              <ParameterUnitDropdown onUnitChange={(value) => onResultUnitChange(node.id, value)} value={node.result.unit}/>
            </span>
          </div>
        )}
      </div>    
    </form>
  )

}

export default NodeFormComponent;