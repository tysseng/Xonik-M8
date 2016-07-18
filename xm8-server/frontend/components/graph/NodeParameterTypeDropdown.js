//TODO: Check if unused is a legal option
import React from 'react'
import parameterTypes from '../../../shared/graph/ParameterTypes.js';

const NodeParameterTypeDropdown = ({value, onParameterTypeChange}) => (
  <select value={value} onChange={(e) => (onParameterTypeChange(e.target.value))}>
    {parameterTypes.list.map(function(parameterType){
      return <option key={parameterType.id} value={parameterType.id}>{parameterType.name}</option>
    })}       
  </select>
);
export default NodeParameterTypeDropdown;