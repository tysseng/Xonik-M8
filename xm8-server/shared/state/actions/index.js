import { groups as undoGroups } from './undo';
const undoGroup = undoGroups.MATRIX;

// If on, all changes to the matrix are sent to the synth core immediately
export const toggleAutoUpdate = (shouldAutoUpdate) => {
  return {
    type: 'TOGGLE_AUTO_UPDATE',
    target: 'SERVER',
    shouldAutoUpdate
  };
}

export const setLoadedPatchFileDetails = (fileId, version) => {
  return {
    type: 'SET_LOADED_PATCH_FILE_DETAILS',
    target: 'SERVER',
    fileId,
    version
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
    target: 'SERVER',
    undoGroup,
    undoDescription: 'Create new node'
  }
}

export const deleteNode = (nodeId) => {
  return {
    type: 'DELETE_NODE',
    nodeId: nodeId,
    target: 'BOTH',
    undoGroup,
    undoDescription: 'Delete node'
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
    target: 'SERVER',    
    undoGroup,
    undoDescription: 'Change node type'
  }
}

export const changeNodeParamType = (nodeId, paramId, paramType) => {
  return {
    type: 'CHANGE_NODE_PARAM_TYPE',      
    nodeId: nodeId,
    paramId: paramId,
    paramType: paramType,
    target: 'SERVER',    
    undoGroup,
    undoDescription: 'Change parameter type'
  }
}

export const changeNodeParamValue  = (nodeId, paramId, paramType, paramValue) => { 
  return {
    type: 'CHANGE_NODE_PARAM_VALUE',      
    nodeId: nodeId,
    paramId: paramId,
    paramType: paramType,
    paramValue: paramValue,
    target: 'SERVER',    
    undoGroup,
    undoDescription: 'Change parameter value'
  }
}

export const changeNodeParamUnit = (nodeId, paramId, paramUnit) => {
  return {
    type: 'CHANGE_NODE_PARAM_UNIT',      
    nodeId: nodeId,
    paramId: paramId,
    paramUnit: paramUnit,
    target: 'SERVER',    
    undoGroup,
    undoDescription: 'Change unit'
  }
}

export const createNewLink = (fromNodeId, toNodeId, toParamId) => {

  return {
    type: 'NEW_LINK',  
    paramValue: fromNodeId,
    nodeId: toNodeId,
    paramId: toParamId,
    target: 'BOTH',    
    undoGroup,
    undoDescription: 'Link nodes'
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

export const toggleLinkNameInGraph = (toNodeId, toParamId, visible) => {
  return {
    type: 'TOGGLE_LINK_NAME_IN_GRAPH',
    toNodeId, 
    toParamId,
    visible,
    target: 'SERVER',    
    undoGroup,
    undoDescription: 'Toggle link name visibility'
  }
}

export const deleteLink = (linkId, fromNodeId, toNodeId, toParamId) => {
  return {
    type: 'DELETE_LINK',
    linkId,
    fromNodeId, 
    toNodeId, 
    toParamId,
    target: 'BOTH',    
    undoGroup,
    undoDescription: 'Delete link'
  }
}

// this action is not explicitly treated by the reducer, but it adds an entry in the
// undo history.
export const matrixUndoPointPositionChanged = () => {
  return setUndoPoint(undoGroup, 'Move node');  
}  