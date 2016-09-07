// TODO: SWITCH TO https://www.npmjs.com/package/es6-enum
import { map as paramTypes } from '../../graph/ParameterTypes'

export const types = {
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
  SET_UNDO_POINT: 'SET_UNDO_POINT',
  NODE_MOVE: 'NODE_MOVE',
  RESET_GRAPH: 'RESET_GRAPH'
};

export const moveNode = (nodeId, x, y, patchNumber = '0') => {
  return {
    type: types.NODE_MOVE,
    target: 'SERVER',
    nodeId,
    x,
    y,
    patchNumber
  };
};

export const selectNode = (nodeId, patchNumber = '0') => {
  return {
    type: types.SELECT_NODE,
    target: 'GUI',    
    nodeId: nodeId,
    patchNumber
  }  
};

export const selectLink = (linkId, patchNumber = '0') => {
  return {
    type: types.SELECT_LINK,
    target: 'GUI',    
    linkId,
    patchNumber
  }  
};

export const createNewNode = (patchNumber = '0') => {
  return {
    type: types.NEW_NODE,
    target: 'SERVER',
    undoDescription: 'Create new node',
    patchNumber
  }
};

export const deleteNode = (nodeId, patchNumber = '0') => {
  return {
    type: types.DELETE_NODE,
    nodeId: nodeId,
    target: 'BOTH',
    undoDescription: 'Delete node',
    patchNumber
  }
};

export const changeNodeName = (nodeId, name, patchNumber = '0') => {
  return {
    type: types.CHANGE_NODE_NAME,
    nodeId,
    name,
    target: 'SERVER',
    patchNumber
  }
};

export const changeNodeType = (nodeId, typeId, patchNumber = '0') => {
  return {
    type: types.CHANGE_NODE_TYPE,
    nodeId: nodeId,
    typeId: typeId,
    target: 'SERVER',    
    undoDescription: 'Change node type',
    patchNumber
  }
};

export const changeNodeParamType = (nodeId, paramId, paramType, patchNumber = '0') => {
  return {
    type: types.CHANGE_NODE_PARAM_TYPE,      
    nodeId,
    paramId,
    paramType,
    target: 'SERVER',    
    undoDescription: 'Change parameter type',
    patchNumber
  }
};

export const changeNodeParamValue  = (nodeId, paramId, paramType, paramValue, patchNumber = '0') => {
  return {
    type: types.CHANGE_NODE_PARAM_VALUE,      
    nodeId,
    paramId,
    paramType,
    paramValue,
    target: 'SERVER',    
    undoDescription: 'Change parameter value',
    patchNumber
  }
};

export const changeNodeParamUnit = (nodeId, paramId, paramUnit, patchNumber = '0') => {
  return {
    type: types.CHANGE_NODE_PARAM_UNIT,      
    nodeId,
    paramId,
    paramUnit,
    target: 'SERVER',    
    undoDescription: 'Change unit',
    patchNumber
  }
};

export const createNewLink = (fromNodeId, toNodeId, toParamId, patchNumber = '0') => {

  return {
    type: types.NEW_LINK,
    paramType: paramTypes.LINK.id,
    paramValue: fromNodeId,
    nodeId: toNodeId,
    paramId: toParamId,
    target: 'BOTH',    
    undoDescription: 'Link nodes',
    patchNumber
  }
};

export const changeLinkName = (toNodeId, toParamId, name, patchNumber = '0') => {
  return {
    type: types.CHANGE_LINK_NAME,
    toNodeId, 
    toParamId,
    name,
    target: 'SERVER',
    patchNumber
  }
};

export const toggleLinkNameInGraph = (toNodeId, toParamId, visible, patchNumber = '0') => {
  return {
    type: types.TOGGLE_LINK_NAME_IN_GRAPH,
    toNodeId, 
    toParamId,
    visible,
    target: 'SERVER',    
    undoDescription: 'Toggle link name visibility',
    patchNumber
  }
};

export const deleteLink = (linkId, patchNumber = '0') => {
  // by splitting id into its parts, some of the reducer code may be reused.
  let linkIdParts = linkId.split('-');
  return {
    type: types.DELETE_LINK,
    linkId,
    target: 'BOTH',
    undoDescription: 'Delete link',
    patchNumber
  }
};

// this action is not explicitly treated by the reducer, but it adds an entry in the
// undo history.
export const graphUndoPointPositionChanged = (patchNumber = '0') => {
  return {
    type: types.SET_UNDO_POINT,
    undoDescription: 'Move element',
    patchNumber
  }
};

export const resetGraph = (patchNumber = '0') => {
  return {
    type: types.RESET_GRAPH,
    target: 'SERVER',
    patchNumber
  }
};