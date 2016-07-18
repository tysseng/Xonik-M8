import React from 'react'
import parameterTypes from '../../../../shared/graph/ParameterTypes.js';

import NodeParameterTypeDropdown from './NodeParameterTypeDropdown.js';
import NodeLinkDropdown from './NodeLinkDropdown.js';
import InputDropdown from '../../inputs/InputDropdown.js';
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
      body = <InputDropdown onChange={(value) => onValueChange(value)} value={value}/>;
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

  return (
    <span>
      <label>{name}{!valid && <span className='invalid'> (incomplete)</span>}</label>
      <div>
        <NodeParameterTypeDropdown value={type} onParameterTypeChange={onTypeChange}/> {body}
      </div>
    </span>
  )
}

export default NodeParameterForm;