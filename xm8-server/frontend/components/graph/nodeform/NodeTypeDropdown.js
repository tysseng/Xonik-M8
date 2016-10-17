import React from 'react';
import { nodeTypes } from '../../../../shared/graph/NodeTypes';
import MiniIcon from '../../framework/MiniIcon';

const NodeTypeDropdown = ({id, value, onNodeTypeChange}) => (
  <div className="nodeType">
    <label htmlFor="nodeType">Type</label>
    <div className="dropdownBlock">
      <select id={id} value={value} onChange={(e) => (onNodeTypeChange(e.target.value))}>
        {nodeTypes.map(function(nodeType){
          return <option key={nodeType.id} value={nodeType.id}>{nodeType.name}</option>
        })}
      </select>
      <MiniIcon label="Help" icon="question.svg"/>
    </div>

    {false && <p>
      Description: {nodeType.description}
    </p>}    
  </div>
) 

export default NodeTypeDropdown;