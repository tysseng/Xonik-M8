let nextAvailableNodeId = 1;

export const selectNode = (nodeId) => {
  return {
    type: 'SELECT_NODE',
    nodeId: nodeId
  }  
}

export const createNewNode = () => {
  return {
    type: 'NEW_NODE',
    nodeId: nextAvailableNodeId++
  }
}

export const changeNodeType = (nodeId, typeId) => {
  return {
    type: 'CHANGE_NODE_TYPE',
    nodeId: nodeId,
    typeId: typeId
  }
}

export const changeNodeParamType = (nodeId, paramId, paramType) => {
  return {
    type: 'CHANGE_NODE_PARAM_TYPE',      
    nodeId: nodeId,
    paramId: paramId,
    paramType: paramType
  }
}

export const changeNodeParamValue  = (nodeId, paramId, paramValue) => { 
  return {
    type: 'CHANGE_NODE_PARAM_VALUE',      
    nodeId: nodeId,
    paramId: paramId,
    paramValue: paramValue
  }
}

export const changeNodeParamUnit = (nodeId, paramId, paramUnit) => {
  return {
    type: 'CHANGE_NODE_PARAM_UNIT',      
    nodeId: nodeId,
    paramId: paramId,
    paramUnit: paramUnit
  }
}