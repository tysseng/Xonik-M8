import { currentVoiceGroupId } from '../voicegroupselector';

export const types = {
  MOVE_ELEMENT: 'MOVE_ELEMENT',
  NEW_GROUP: 'NEW_GROUP',
  DELETE_GROUP: 'DELETE_GROUP',
  ADD_ELEMENT: 'ADD_ELEMENT',
  DELETE_ELEMENT: 'DELETE_ELEMENT',
  CHANGE_ELEMENT_TYPE: 'CHANGE_ELEMENT_TYPE',
  SET_UNDO_POINT: 'SET_UNDO_POINT',
  TOGGLE_VISIBILITY: 'TOGGLE_VISIBILITY',
  RENAME_GROUP: 'RENAME_GROUP'
}

export const toggleVisibility = (groupId, isVisible, patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.TOGGLE_VISIBILITY,
    groupId,
    isVisible,
    target: 'SERVER',
    patchNumber
  }
}

export const renameGroup = (groupId, name, patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.RENAME_GROUP,
    groupId,
    name,
    target: 'SERVER',
    patchNumber
  }
}

export const changeElementType = (groupId, id, inputType, patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.CHANGE_ELEMENT_TYPE,
    groupId,
    id,
    inputType,
    target: 'SERVER',
    undoDescription: 'Change element type',
    patchNumber
  };  
}

export const moveElement = (groupId, id, offsetXem, offsetYem, patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.MOVE_ELEMENT,
    id,
    groupId,    
    offsetXem, 
    offsetYem,
    target: 'SERVER',
    patchNumber
  }
}

export const newGroup = (groupId, patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.NEW_GROUP,
    target: 'SERVER',
    groupId,
    undoDescription: 'New group',
    patchNumber
  }
}

export const deleteGroup = (groupId, patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.DELETE_GROUP,
    target: 'BOTH',
    groupId,
    undoDescription: 'Delete group',
    patchNumber
  }
}

export const addElement = (id, groupId, elementId, elementType, offsetXem, offsetYem, patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.ADD_ELEMENT,
    id, 
    groupId, 
    elementId, 
    elementType, 
    offsetXem, 
    offsetYem,
    target: 'BOTH',
    undoDescription: 'Add element',
    patchNumber
  }
}

export const deleteElement = (id, groupId, patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.DELETE_ELEMENT,
    id, 
    groupId,
    target: 'BOTH',
    undoDescription: 'Delete element',
    patchNumber
  }
}

export const inputgroupsUndoPointPositionChanged = (patchNumber = currentVoiceGroupId()) =>{
  return {
    type: types.SET_UNDO_POINT,
    undoDescription: 'Move element',
    patchNumber
  }
}