export const groups = {
  MATRIX: 'MATRIX',
  INPUTGRID: 'INPUTGRID',
  INPUTS: 'INPUTS'
}

export const types = {
  UNDO: 'UNDO',
  REDO: 'REDO',
  SET_UNDO_POINT: 'SET_UNDO_POINT'
}

export const undo = (undoGroup) => {
  return {
    type: types.UNDO,
    undoGroup
  }
}

export const redo = (undoGroup) => {
  return {
    type: types.REDO,
    undoGroup
  }
}