import React from 'react'

const NodeLinkDropdown = ({value, onNodeLinkChange}) => (
  <select value={value} onChange={(e) => {onNodeLinkChange(e.target.value)}}>
    <option value="">Not selected</option>
    <option value="0">Node 0</option>
    <option value="1">Node 1</option>
    <option value="2">Node 2</option>
    <option value="3">Node 3</option>  
  </select>
)

export default NodeLinkDropdown;