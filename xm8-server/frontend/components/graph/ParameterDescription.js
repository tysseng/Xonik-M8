import React from 'react'
import parameterTypes from '../../../shared/graph/ParameterTypes.js';
import {inputsById} from '../../../shared/graph/Inputs.js'
import {outputsById} from '../../../shared/graph/Outputs.js'
import {unitsById} from '../../../shared/graph/ParameterUnits.js';

const ParameterDescription = ({
  name,
  parameter,
  nodes,
  userClassName
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
      // TODO: Get inputs as id->map
      if(value){
        let inputName = inputsById[value].defaultName;
        body = "Input from " + inputName;
      }
      break;
    case "output":
      let outputName = outputsById[value].name;
      body = "Output to " + outputName;
      break;
    case "result":
      if(value) {
        value = value.from; // links are stored as objects, not single values. Get from-node from link
        body = "Result of " + nodes[value].name;
      }
      break;
    case "constant":
      if(value) {
        body = value + ' ' + unitsById[unit].name;
      }
      break;
  }

  let classNameString = "parameterDescription";
  if(userClassName){
    classNameString += ' ' + userClassName;
  }

  return (
    <div className={classNameString}>
      <div className="name">{name}</div>
      <div className="value">{body}</div>
    </div>
  )
}

export default ParameterDescription;