//TODO: Check if unused is a legal option
import React from 'react'
import _ from 'lodash';
import parameterTypes from '../../../../shared/graph/ParameterTypes.js';  
import {globalTypeBlacklist} from '../../../../shared/graph/NodeTypes.js';  

export const washParamTypesList = (parameterDefinition) => {
  let allTypes = parameterTypes.list;

  let whitelist = parameterDefinition.typeWhitelist
  let blacklist = parameterDefinition.typeBlacklist
  if(whitelist){
    return _.filter(allTypes, paramType => {
      return _.includes(whitelist, paramType.id);
    });
  } else if(blacklist){
    return _.filter(allTypes, paramType => {
      return !_.includes(blacklist, paramType.id);
    });
  } else if(globalTypeBlacklist){ 
    return _.filter(allTypes, paramType => {
      return !_.includes(globalTypeBlacklist, paramType.id);
    });
  } else {
    return allTypes;
  }
}

const NodeParameterTypeDropdown = ({parameterDefinition, value, onParameterTypeChange}) => {

  let selectValues = washParamTypesList(parameterDefinition);

  return (
    <select value={value} onChange={(e) => (onParameterTypeChange(e.target.value))}>
      {selectValues.map(function(parameterType){
        return <option key={parameterType.id} value={parameterType.id}>{parameterType.name}</option>
      })}       
    </select>
  );
}
export default NodeParameterTypeDropdown;