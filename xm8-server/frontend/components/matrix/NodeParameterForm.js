import React from 'react'
import parameterTypes from '../../../shared/matrix/ParameterTypes.js';

import NodeParameterTypeDropdown from './NodeParameterTypeDropdown.js';
import NodeLinkDropdown from './NodeLinkDropdown.js';
import InputLinkDropdown from './InputLinkDropdown.js';
import OutputLinkDropdown from './OutputLinkDropdown.js';
import ParameterUnitDropdown from './ParameterUnitDropdown.js';

const NodeParameterForm = ({
  name,
  parameter,
  currentnode,
  nodes,
  onValueChange, 
  onTypeChange,
  onUnitChange
}) => {
  let value=parameter.value;
  let type=parameter.type;
  let unit=parameter.unit;
  let valid=parameter.valid;

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
      if(value)  value = value.from; // links are stored as objects, not single values. Get from-node from link
      body = <NodeLinkDropdown nodes={nodes} currentnode={currentnode} onNodeLinkChange={(value) => onValueChange(value)} value={value}/>;
      break;
    case "constant":
      body = 
        <span>
          <input className="paramValue" type="text" onChange={(e) => onValueChange(e.target.value)} value={value}/>
          <ParameterUnitDropdown onUnitChange={(value) => onUnitChange(value)} value={unit}/>
        </span>;
      break;
  }

  // show validation errors
  let color = valid ? {} : {color: '#ff0000'};

  return (
    <span style={color}>
      <label>{name}</label>
      <div>
        <NodeParameterTypeDropdown value={type} onParameterTypeChange={onTypeChange}/> {body}
      </div>
    </span>
  )
}

export default NodeParameterForm;