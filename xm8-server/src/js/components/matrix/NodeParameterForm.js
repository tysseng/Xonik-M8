import React from 'react'
import parameterTypes from '../../../../shared/matrix/ParameterTypes.js';

import NodeParameterTypeDropdown from './NodeParameterTypeDropdown.js';
import NodeLinkDropdown from './NodeLinkDropdown.js';
import InputLinkDropdown from './InputLinkDropdown.js';
import OutputLinkDropdown from './OutputLinkDropdown.js';
import ParameterUnitDropdown from './ParameterUnitDropdown.js';

const NodeParameterForm = ({
  name,
  value, 
  type,
  unit,
  onValueChange, 
  onTypeChange,
  onUnitChange
}) => {
  let body;

  switch(type){
    case "unused":
      body = "";
      break;
    case "input":
      body = <InputLinkDropdown onInputLinkChange={(value) => onValueChange(value)} value={value}/>;
      break;
    case "output":
      body = <OutputLinkDropdown onOutputLinkChange={(value) => onValueChange(value)} value={value}/>;
      break;
    case "result":
      body = <NodeLinkDropdown onNodeLinkChange={(value) => onValueChange(value)} value={value}/>;
      break;
    case "constant":
      body = 
        <span>
          <input type="text" onChange={(e) => onValueChange(e.target.value)} value={value}/>
          <ParameterUnitDropdown onUnitChange={(value) => onUnitChange(value)} value={unit}/>
        </span>;
      break;
  }

  return (
    <span>
      {name}:
      <NodeParameterTypeDropdown value={type} onParameterTypeChange={onTypeChange}/> 
      {body}<br/>
    </span>
  )
}

export default NodeParameterForm;