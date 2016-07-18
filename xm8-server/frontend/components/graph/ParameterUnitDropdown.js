import React from 'react'
import parameterUnits from '../../../shared/graph/ParameterUnits.js';

const ParameterUnitDropdown = ({value, onUnitChange}) => (
  <select value={value} onChange={(e) => (onUnitChange(e.target.value))}>
    {parameterUnits.map(function(parameterUnit){
      return <option key={parameterUnit.id} value={parameterUnit.id}>{parameterUnit.name}</option>
    })}
  </select>
)

export default ParameterUnitDropdown;