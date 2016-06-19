import React from 'react'
import nodeTypes from '../../../shared/matrix/NodeTypes.js';

const NodeTypeDropdown = ({id, value, onNodeTypeChange}) => (
  <div>
    <label htmlFor="nodeType">Type</label>
    <div className="dropdownBlock">
      <select id={id} value={value} onChange={(e) => (onNodeTypeChange(e.target.value))}>
        {nodeTypes.list.map(function(nodeType){
          return <option key={nodeType.id} value={nodeType.id}>{nodeType.name}</option>
        })}
      </select>
      <img className="miniicon" src="img/icons/question.svg"/>
    </div>

    {false && <p>
      Description: {nodeType.description}
    </p>}    
  </div>
) 

export default NodeTypeDropdown;