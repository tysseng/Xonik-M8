import React from 'react'
import inputs from '../../../shared/matrix/Inputs.js'

const InputLinkDropdown = ({value, onInputLinkChange}) => (
  <select value={value} onChange={(e) => {onInputLinkChange(e.target.value)}}>
    <option value="">Not selected</option>
    {inputs.map(function(input){
      return <option key={input.id} value={input.id}>{input.defaultName}</option>
    })}
  </select>
)

export default InputLinkDropdown;