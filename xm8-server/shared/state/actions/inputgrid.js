export const inputgridActionTypes = {
  SELECT_ELEMENT: 'SELECT_ELEMENT',
  MOVE_ELEMENT: 'MOVE_ELEMENT',
  DESELECT_ELEMENT: 'DESELECT_ELEMENT'
}

let types = inputgridActionTypes;

export const selectElement = (id, x, y) => {
  return {
    type: types.SELECT_ELEMENT,
    x,
    y,
    id,
    target: 'SERVER'
  };  
}

export const moveElement = (id, x, y) => {
  return {
    type: types.MOVE_ELEMENT,
    x,
    y,
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