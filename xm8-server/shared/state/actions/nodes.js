// TODO: SWITCH TO https://www.npmjs.com/package/es6-enum
import { map as paramTypes } from '../../graph/ParameterTypes'

export const types = {
  SET_LOADED_PATCH_FILE_DETAILS: 'SET_LOADED_PATCH_FILE_DETAILS',
  SELECT_NODE: 'SELECT_NODE',
  SELECT_LINK: 'SELECT_LINK',
  NEW_NODE: 'NEW_NODE',
  DELETE_NODE: 'DELETE_NODE',
  CHANGE_NODE_NAME: 'CHANGE_NODE_NAME',
  CHANGE_NODE_TYPE: 'CHANGE_NODE_TYPE',
  CHANGE_NODE_PARAM_TYPE: 'CHANGE_NODE_PARAM_TYPE',      
  CHANGE_NODE_PARAM_VALUE: 'CHANGE_NODE_PARAM_VALUE',      
  CHANGE_NODE_PARAM_UNIT: 'CHANGE_NODE_PARAM_UNIT',      
  NEW_LINK: 'NEW_LINK',  
  CHANGE_LINK_NAME: 'CHANGE_LINK_NAME',
  TOGGLE_LINK_NAME_IN_GRAPH: 'TOGGLE_LINK_NAME_IN_GRAPH',
  DELETE_LINK: 'DELETE_LINK',  
  TOGGLE_AUTO_UPDATE: 'TOGGLE_AUTO_UPDATE',
  SET_UNDO_POINT: 'SET_UNDO_POINT',
  NODE_MOVE: 'NODE_MOVE',
  RESET_GRAPH: 'RESET_GRAPH'
};

export const moveNode = (nodeId, x, y) => {
  return {
    type: types.NODE_MOVE,
    target: 'SERVER',
    nodeId,
    x,
    y
  };
};

export const setLoadedPatchFileDetails = (fileId, version) => {
  return {
    type: types.SET_LOADED_PATCH_FILE_DETAILS,
    target: 'SERVER',
    fileId,
    version
  };
};

export const selectNode = (nodeId) => {
  return {
    type: types.SELECT_NODE,
    target: 'GUI',    
    nodeId: nodeId
  }  
};

export const selectLink = (linkId) => {
  return {
    type: types.SELECT_LINK,
    target: 'GUI',    
    linkId
  }  
};

export const createNewNode = () => {
  return {
    type: types.NEW_NODE,
    target: 'SERVER',
    undoDescription: 'Create new node'
  }
};

export const deleteNode = (nodeId) => {
  return {
    type: types.DELETE_NODE,
    nodeId: nodeId,
    target: 'BOTH',
    undoDescription: 'Delete node'
  }
};

export const changeNodeName = (nodeId, name) => {
  return {
    type: types.CHANGE_NODE_NAME,
    nodeId,
    name,
    target: 'SERVER'
  }
};

export const changeNodeType = (nodeId, typeId) => {
  return {
    type: types.CHANGE_NODE_TYPE,
    nodeId: nodeId,
    typeId: typeId,
    target: 'SERVER',    
    undoDescription: 'Change node type'
  }
};

export const changeNodeParamType = (nodeId, paramId, paramType) => {
  return {
    type: types.CHANGE_NODE_PARAM_TYPE,      
    nodeId,
    paramId,
    paramType,
    target: 'SERVER',    
    undoDescription: 'Change parameter type'
  }
};

export const changeNodeParamValue  = (nodeId, paramId, paramType, paramValue) => { 
  return {
    type: types.CHANGE_NODE_PARAM_VALUE,      
    nodeId,
    paramId,
    paramType,
    paramValue,
    target: 'SERVER',    
    undoDescription: 'Change parameter value'
  }
};

export const changeNodeParamUnit = (nodeId, paramId, paramUnit) => {
  return {
    type: types.CHANGE_NODE_PARAM_UNIT,      
    nodeId,
    paramId,
    paramUnit,
    target: 'SERVER',    
    undoDescription: 'Change unit'
  }
};

export const createNewLink = (fromNodeId, toNodeId, toParamId) => {

  return {
    type: types.NEW_LINK,
    paramType: paramTypes.LINK.id,
    paramValue: fromNodeId,
    nodeId: toNodeId,
    paramId: toParamId,
    target: 'BOTH',    
    undoDescription: 'Link nodes'
  }
};

export const changeLinkName = (toNodeId, toParamId, name) => {
  return {
    type: types.CHANGE_LINK_NAME,
    toNodeId, 
    toParamId,
    name,
    target: 'SERVER'
  }
};

export const toggleLinkNameInGraph = (toNodeId, toParamId, visible) => {
  return {
    type: types.TOGGLE_LINK_NAME_IN_GRAPH,
    toNodeId, 
    toParamId,
    visible,
    target: 'SERVER',    
    undoDescription: 'Toggle link name visibility'
  }
};

export const deleteLink = (linkId) => {
  // by splitting id into its parts, some of the reducer code may be reused.
  let linkIdParts = linkId.split('-');
  return {
    type: types.DELETE_LINK,
    linkId,
    target: 'BOTH',
    undoDescription: 'Delete link'
  }
};

// this action is not explicitly treated by the reducer, but it adds an entry in the
// undo history.
export const graphUndoPointPositionChanged = () => {
  return {
    type: types.SET_UNDO_POINT,
    undoDescription: 'Move element'
  }
};

export const resetGraph = () => {
  return {
    type: types.RESET_GRAPH,
    target: 'SERVER'
  }
};