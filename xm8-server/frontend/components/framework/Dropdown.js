import React from 'react'
import _ from 'lodash';

const Dropdown = ({values, value, onChange, nameFunc = name => name}) => {

  let orderedValues = _.sortBy(values, ['sortKey']);
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">Not selected</option>
      {orderedValues.map(value => {
        return <option key={value.id} value={value.id}>{nameFunc(value.name)}</option>
      })}
    </select>
  )
}

export default Dropdown;