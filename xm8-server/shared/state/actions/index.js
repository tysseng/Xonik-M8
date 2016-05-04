export const setState = (state) => {
  return {
    type: 'SET_STATE',
    target: 'GUI',
    state
  };
}

export const selectNode = (nodeId) => {
  return {
    type: 'SELECT_NODE',
    target: 'GUI',    
    nodeId: nodeId
  }  
}

export const createNewNode = () => {
  return {
    type: 'NEW_NODE',
    target: 'SERVER'
  }
}

export const changeNodeType = (nodeId, typeId) => {
  return {
    type: 'CHANGE_NODE_TYPE',
    nodeId: nodeId,
    typeId: typeId,
    target: 'SERVER'
  }
}

export const changeNodeParamType = (nodeId, paramId, paramType) => {
  return {
    type: 'CHANGE_NODE_PARAM_TYPE',      
    nodeId: nodeId,
    paramId: paramId,
    paramType: paramType,
    target: 'SERVER'
  }
}

export const changeNodeParamValue  = (nodeId, paramId, paramValue) => { 
  return {
    type: 'CHANGE_NODE_PARAM_VALUE',      
    nodeId: nodeId,
    paramId: paramId,
    paramValue: paramValue,
    target: 'SERVER'
  }
}

export const changeNodeParamUnit = (nodeId, paramId, paramUnit) => {
  return {
    type: 'CHANGE_NODE_PARAM_UNIT',      
    nodeId: nodeId,
    paramId: paramId,
    paramUnit: paramUnit,
    target: 'SERVER'
  }
}