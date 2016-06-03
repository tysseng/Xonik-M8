// If on, all changes to the matrix are sent to the synth core immediately
export const toggleAutoUpdate = (shouldAutoUpdate) => {
  console.log(shouldAutoUpdate)
  return {
    type: 'TOGGLE_AUTO_UPDATE',
    target: 'SERVER',
    shouldAutoUpdate
  };
}

export const setLoadedPatchFileDetails = (fileId) => {
  return {
    type: 'SET_LOADED_PATCH_FILE_DETAILS',
    target: 'SERVER',
    fileId
  };
}


export const loadNodesFromFile = (fileId, version, nodes) => {
  return {
    type: 'LOAD_NODES_FROM_FILE',
    target: 'SERVER',
    fileId,
    version,
    nodes
  }
}


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

export const selectLink = (linkId) => {
  return {
    type: 'SELECT_LINK',
    target: 'GUI',    
    linkId
  }  
}

export const createNewNode = () => {
  return {
    type: 'NEW_NODE',
    target: 'SERVER'
  }
}

export const deleteNode = (nodeId) => {
  return {
    type: 'DELETE_NODE',
    nodeId: nodeId,
    target: 'BOTH'
  }
}

export const changeNodeName = (nodeId, name) => {
  return {
    type: 'CHANGE_NODE_NAME',
    nodeId,
    name,
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

export const changeNodeParamValue  = (nodeId, paramId, paramType, paramValue) => { 
  return {
    type: 'CHANGE_NODE_PARAM_VALUE',      
    nodeId: nodeId,
    paramId: paramId,
    paramType: paramType,
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

export const changeLinkName = (toNodeId, toParamId, name) => {
  return {
    type: 'CHANGE_LINK_NAME',
    toNodeId, 
    toParamId,
    name,
    target: 'SERVER'
  }
}


export const deleteLink = (linkId, fromNodeId, toNodeId, toParamId) => {
  return {
    type: 'DELETE_LINK',
    linkId,
    fromNodeId, 
    toNodeId, 
    toParamId,
    target: 'BOTH'
  }
}