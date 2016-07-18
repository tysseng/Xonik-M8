import React from 'react'

const InputLinkDropdown = ({inputs, value, onInputLinkChange}) => {

  let orderedInputs = _.sortBy(inputs, ['sortKey']);

  return (
    <select value={value} onChange={(e) => {onInputLinkChange(e.target.value)}}>
      <option value="">Not selected</option>
      {orderedInputs.map(function(input){
        return <option key={input.id} value={input.id}>{input.name.full}</option>
      })}
    </select>
  )
}

export default InputLinkDropdown;