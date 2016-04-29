import React from 'react'
import nodeTypes from '../../../../shared/matrix/NodeTypes.js';

const NodeTypeDropdown = ({id, value, onNodeTypeChange}) => (
  <select id={id} value={value} onChange={(e) => (onNodeTypeChange(e.target.value))}>
    <option value="-1">Not selected</option>
    {nodeTypes.list.map(function(nodeType){
      return <option key={nodeType.id} value={nodeType.id}>{nodeType.name}</option>
    })}
  </select>
) 

export default NodeTypeDropdown;