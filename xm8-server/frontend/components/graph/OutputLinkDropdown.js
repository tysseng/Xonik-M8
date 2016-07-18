import React from 'react'
import outputs from '../../../shared/graph/Outputs.js'

const OutputLinkDropdown = ({value, onOutputLinkChange}) => (
  <select value={value} onChange={(e) => (onOutputLinkChange(e.target.value))}>
    <option value="">Not selected</option>
    {outputs.map(function(output){
      return <option key={output.id} value={output.id}>{output.name}</option>
    })}
  </select>
)
module.exports = OutputLinkDropdown;