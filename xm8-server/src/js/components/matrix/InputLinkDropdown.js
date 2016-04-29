import React from 'react'

const InputLinkDropdown = ({value, onInputLinkChange}) => (
      <select value={value} onChange={(e) => {onInputLinkChange(e.target.value)}}>
        <option value="">Not selected</option>
        <option value="0">Input 0</option>
        <option value="1">Input 1</option>
        <option value="2">Input 2</option>
        <option value="3">Input 3</option>  
      </select>
)

export default InputLinkDropdown;