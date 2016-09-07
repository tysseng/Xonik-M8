export const inputgroupsActionTypes = {
  SELECT_GROUP: 'SELECT_GROUP',
  SELECT_ELEMENT: 'SELECT_ELEMENT',
  MOVE_ELEMENT: 'MOVE_ELEMENT',
  DESELECT_ELEMENT: 'DESELECT_ELEMENT',
  DESELECT_DRAG_ELEMENT: 'DESELECT_DRAG_ELEMENT',
  NEW_GROUP: 'NEW_GROUP',
  DELETE_GROUP: 'DELETE_GROUP',
  ADD_ELEMENT: 'ADD_ELEMENT',
  DELETE_ELEMENT: 'DELETE_ELEMENT',
  OPEN_NEW_ELEMENT_DIALOG: 'OPEN_NEW_ELEMENT_DIALOG',
  CLOSE_NEW_ELEMENT_DIALOG: 'CLOSE_NEW_ELEMENT_DIALOG',
  SELECT_ID_IN_NEW_ELEMENT_DIALOG: 'SELECT_ID_IN_NEW_ELEMENT_DIALOG',
  CHANGE_ELEMENT_TYPE: 'CHANGE_ELEMENT_TYPE',
  SET_UNDO_POINT: 'SET_UNDO_POINT',
  TOGGLE_VISIBILITY: 'TOGGLE_VISIBILITY',
  RENAME_GROUP: 'RENAME_GROUP'
}

let types = inputgroupsActionTypes;

export const toggleVisibility = (groupId, isVisible, patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.TOGGLE_VISIBILITY,
    groupId,
    isVisible,
    target: 'SERVER',
    patchNumber
  }
}

export const renameGroup = (groupId, name, patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.RENAME_GROUP,
    groupId,
    name,
    target: 'SERVER',
    patchNumber
  }
}

export const selectGroup = (selectedGroupId, patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.SELECT_GROUP,
    selectedGroupId,
    target: 'GUI',
    patchNumber
  }
}

export const changeElementType = (groupId, id, inputType, patchNumber = '0') =>{
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

export const selectElement = (id, mouseX, mouseY, offsetXem, offsetYem, patchNumber = '0') =>{
  return {
    type: types.SELECT_ELEMENT,
    mouseX, 
    mouseY, 
    offsetXem, 
    offsetYem,    
    id,
    target: 'GUI',
    patchNumber
  };  
}

export const moveElement = (groupId, id, offsetXem, offsetYem, patchNumber = '0') =>{
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

export const deselectElement = (patchNumber = '0') =>{
  return {
    type: types.DESELECT_ELEMENT,
    target: 'GUI',
    patchNumber
  }
}

export const deselectDragElement = (patchNumber = '0') =>{
  return {
    type: types.DESELECT_DRAG_ELEMENT,
    target: 'GUI',
    patchNumber
  }
}

export const newGroup = (groupId, patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.NEW_GROUP,
    target: 'SERVER',
    groupId,
    undoDescription: 'New group',
    patchNumber
  }
}

export const deleteGroup = (groupId, patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.DELETE_GROUP,
    target: 'BOTH',
    groupId,
    undoDescription: 'Delete group',
    patchNumber
  }
}

export const addElement = (id, groupId, elementId, elementType, offsetXem, offsetYem, patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.ADD_ELEMENT,
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

export const deleteElement = (id, groupId, patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.DELETE_ELEMENT,
    id, 
    groupId,
    target: 'BOTH',
    undoDescription: 'Delete element',
    patchNumber
  }
}

export const openNewElementDialog = (patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.OPEN_NEW_ELEMENT_DIALOG,
    target: 'GUI',
    patchNumber
  }
}

export const closeNewElementDialog = (patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.CLOSE_NEW_ELEMENT_DIALOG,
    target: 'GUI',
    patchNumber
  } 
}

export const selectInputInNewElementDialog = (elementType, elementId, patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.SELECT_ID_IN_NEW_ELEMENT_DIALOG,
    elementId,
    elementType,
    target: 'GUI',
    patchNumber
  }   
}

export const inputgroupsUndoPointPositionChanged = (patchNumber = '0') =>{
  return {
    type: inputgroupsActionTypes.SET_UNDO_POINT,
    undoDescription: 'Move element',
    patchNumber
  }
}