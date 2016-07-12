export const inputgridActionTypes = {
  SELECT_ELEMENT: 'SELECT_ELEMENT',
  MOVE_ELEMENT: 'MOVE_ELEMENT',
  DESELECT_ELEMENT: 'DESELECT_ELEMENT'
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
    target: 'SERVER'
  };  
}

export const moveElement = (id, offsetXem, offsetYem) => {
  return {
    type: types.MOVE_ELEMENT,
    offsetXem, 
    offsetYem,
    id,
    target: 'SERVER'
  }
}

export const deselectElement = () => {
  return {
    type: types.DESELECT_ELEMENT,
    target: 'SERVER'
  }
}