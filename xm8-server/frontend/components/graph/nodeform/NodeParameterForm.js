import React from 'react'

import NodeParameterTypeDropdown from './NodeParameterTypeDropdown';
import NodeLinkDropdown from './NodeLinkDropdown';
import InputDropdown from '../../inputs/InputDropdown';
import OutputLinkDropdown from './OutputLinkDropdown';
import ParameterUnitDropdown from './ParameterUnitDropdown';

const NodeParameterForm = ({
  parameterDefinition,
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
      body = <InputDropdown type='physicalInputs' onChange={(value) => onValueChange(value)} value={value}/>;
      break;
    case "virtualinput":
      body = <InputDropdown type='virtualInputs' onChange={(value) => onValueChange(value)} value={value}/>;
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
      <label>{parameterDefinition.name}{!valid && <span className='invalid'> (incomplete)</span>}</label>
      <div>
        <NodeParameterTypeDropdown
          value={type} 
          onParameterTypeChange={onTypeChange} 
          parameterDefinition={parameterDefinition}/> 
          {body}
      </div>
    </span>
  )
}

export default NodeParameterForm;