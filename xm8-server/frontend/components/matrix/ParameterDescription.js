import React from 'react'
import parameterTypes from '../../../shared/matrix/ParameterTypes.js';
import inputs from '../../../shared/matrix/Inputs.js'
import outputs from '../../../shared/matrix/Outputs.js'
import parameterUnits from '../../../shared/matrix/ParameterUnits.js';

const ParameterDescription = ({
  name,
  parameter,
  nodes
}) => {
  let value=parameter.value;
  let type=parameter.type;
  let unit=parameter.unit;
  let valid=parameter.valid;

  let body;

  console.log(name, parameter, nodes)
  //if(!valid) return null;

  switch(type){
    case "unused":
      body = "";
      break;
    case "input":
      // TODO: Get inputs as id->map
      let inputName = '';//inputsAsMap[parameter.value].defaultName;
      body = "Input from " + inputName;
      break;
    case "output":
      let outputName = ''; //outputsAsMap[parameter.value].name;
      body = "Output to " + outputName;
      break;
    case "result":
      if(value) {
        value = value.from; // links are stored as objects, not single values. Get from-node from link
        body = "Result of " + nodes[value].name;
      }
      break;
    case "constant":
      body = value + ' '// + parameterUnits[unit].name;
      break;
  }

  return (
    <div className="parameterToString">
      <div className="name">{name}</div>
      <div className="value">{body}</div>
    </div>
  )
}

export default ParameterDescription;