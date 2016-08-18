export const inputgroupsActionTypes = {
  SELECT_GROUP: 'SELECT_GROUP',
  SELECT_ELEMENT: 'SELECT_ELEMENT',
  MOVE_ELEMENT: 'MOVE_ELEMENT',
  DESELECT_ELEMENT: 'DESELECT_ELEMENT',
  DESELECT_DRAG_ELEMENT: 'DESELECT_DRAG_ELEMENT',
  NEW_GROUP: 'NEW_GROUP',
  LOAD_GROUP: 'LOAD_GROUP',
  ADD_ELEMENT: 'ADD_ELEMENT',
  DELETE_ELEMENT: 'DELETE_ELEMENT',
  OPEN_NEW_ELEMENT_DIALOG: 'OPEN_NEW_ELEMENT_DIALOG',
  CLOSE_NEW_ELEMENT_DIALOG: 'CLOSE_NEW_ELEMENT_DIALOG',
  SELECT_ID_IN_NEW_ELEMENT_DIALOG: 'SELECT_ID_IN_NEW_ELEMENT_DIALOG',
  CHANGE_ELEMENT_TYPE: 'CHANGE_ELEMENT_TYPE',
  SET_UNDO_POINT: 'SET_UNDO_POINT'
}

let types = inputgroupsActionTypes;


export const selectGroup = (selectedGroupId) => {
  return {
    type: inputgroupsActionTypes.SELECT_GROUP,
    selectedGroupId,
    target: 'GUI'
  }
}

export const changeElementType = (groupId, id, inputType) => {
  return {
    type: types.CHANGE_ELEMENT_TYPE,
    groupId,
    id,
    inputType,
    target: 'SERVER',
    undoDescription: 'Change element type'
  };  
}

export const selectElement = (id, mouseX, mouseY, offsetXem, offsetYem) => {
  return {
    type: types.SELECT_ELEMENT,
    mouseX, 
    mouseY, 
    offsetXem, 
    offsetYem,    
    id,
    target: 'GUI'
  };  
}

export const moveElement = (groupId, id, offsetXem, offsetYem) => {
  return {
    type: types.MOVE_ELEMENT,
    id,
    groupId,    
    offsetXem, 
    offsetYem,
    target: 'SERVER'
  }
}

export const deselectElement = () => {
  return {
    type: types.DESELECT_ELEMENT,
    target: 'GUI'
  }
}

export const deselectDragElement = () => {
  return {
    type: types.DESELECT_DRAG_ELEMENT,
    target: 'GUI'
  }
}

export const newGroup = (groupId) => {
  return {
    type: inputgroupsActionTypes.NEW_GROUP,
    target: 'SERVER',
    groupId,
    undoDescription: 'New group'
  }
}

export const loadGroup = (groupId) => {
  return {
    type: inputgroupsActionTypes.LOAD_GROUP,
    groupId,
    target: 'SERVER',
    undoDescription: 'Load group'
  }
}

export const addElement = (id, groupId, elementId, elementType, offsetXem, offsetYem) => {
  return {
    type: inputgroupsActionTypes.ADD_ELEMENT,
    id, 
    groupId, 
    elementId, 
    elementType, 
    offsetXem, 
    offsetYem,
    target: 'BOTH',
    undoDescription: 'Add element'
  }
}

export const deleteElement = (id, groupId) => {
  return {
    type: inputgroupsActionTypes.DELETE_ELEMENT,
    id, 
    groupId,
    target: 'SERVER',
    undoDescription: 'Delete element'
  }
}

export const openNewElementDialog = () => {
  return {
    type: inputgroupsActionTypes.OPEN_NEW_ELEMENT_DIALOG,
    target: 'GUI'
  }
}

export const closeNewElementDialog = () => {
  return {
    type: inputgroupsActionTypes.CLOSE_NEW_ELEMENT_DIALOG,
    target: 'GUI'
  } 
}

export const selectInputInNewElementDialog = (elementType, elementId) => {
  return {
    type: inputgroupsActionTypes.SELECT_ID_IN_NEW_ELEMENT_DIALOG,
    elementId,
    elementType,
    target: 'GUI'
  }   
}

export const inputgroupsUndoPointPositionChanged = () => {
  return {
    type: inputgroupsActionTypes.SET_UNDO_POINT,
    undoDescription: 'Move element'
  }
}