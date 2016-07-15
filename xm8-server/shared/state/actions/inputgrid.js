export const inputgridActionTypes = {
  SELECT_ELEMENT: 'SELECT_ELEMENT',
  MOVE_ELEMENT: 'MOVE_ELEMENT',
  DESELECT_ELEMENT: 'DESELECT_ELEMENT',
  NEW_GROUP: 'NEW_GROUP',
  LOAD_GROUP: 'LOAD_GROUP',
  ADD_ELEMENT: 'ADD_ELEMENT',
  DELETE_ELEMENT: 'DELETE_ELEMENT',
  OPEN_NEW_ELEMENT_DIALOG: 'OPEN_NEW_ELEMENT_DIALOG',
  CLOSE_NEW_ELEMENT_DIALOG: 'CLOSE_NEW_ELEMENT_DIALOG',
  SELECT_ID_IN_NEW_ELEMENT_DIALOG: 'SELECT_ID_IN_NEW_ELEMENT_DIALOG'
}

let types = inputgridActionTypes;

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

export const newGroup = (groupId) => {
  return {
    type: inputgridActionTypes.NEW_GROUP,
    groupId,
    target: 'SERVER'
  }
}

export const loadGroup = (groupId) => {
  return {
    type: inputgridActionTypes.LOAD_GROUP,
    groupId,
    target: 'SERVER'
  }
}

export const addElement = (id, groupId, elementId, elementType, offsetXem, offsetYem) => {
  return {
    type: inputgridActionTypes.ADD_ELEMENT,
    id, 
    groupId, 
    elementId, 
    elementType, 
    offsetXem, 
    offsetYem,
    target: 'BOTH'
  }
}

export const deleteElement = (id, groupId) => {
  return {
    type: inputgridActionTypes.DELETE_ELEMENT,
    id, 
    groupId,
    target: 'SERVER'
  }
}

export const openNewElementDialog = () => {
  return {
    type: inputgridActionTypes.OPEN_NEW_ELEMENT_DIALOG,
    target: 'GUI'
  }
}

export const closeNewElementDialog = () => {
  return {
    type: inputgridActionTypes.CLOSE_NEW_ELEMENT_DIALOG,
    target: 'GUI'
  } 
}

export const selectInputInNewElementDialog = (elementType, elementId) => {
  return {
    type: inputgridActionTypes.SELECT_ID_IN_NEW_ELEMENT_DIALOG,
    elementId,
    elementType,
    target: 'GUI'
  }   
}