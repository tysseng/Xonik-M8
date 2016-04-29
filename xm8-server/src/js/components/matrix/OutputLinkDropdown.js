import React from 'react'
import outputs from '../../../../shared/matrix/Outputs.js'

const OutputLinkDropdown = ({value, onOutputLinkChange}) => (
  <select value={value} onChange={(e) => (onOutputLinkChange(e.target.value))}>

  </select>
)
module.exports = OutputLinkDropdown;

/*
    <option key={-1} value={}>Not selected</option>
    {outputs.map(function(output){
      return <option key={output.id} value={output.id}>{output.name}</option>
    })}
*/