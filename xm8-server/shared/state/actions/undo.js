export const groups = {
  MATRIX: 'MATRIX',
  INPUTGRID: 'INPUTGRID' 
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

// this action is not explicitly treated by the reducer, but it adds an entry in the
// undo history because it has an undoGroup.
export const setUndoPoint = (undoGroup, description) => {
  return {
    type: types.SET_UNDO_POINT,
    undoGroup,
    undoDescription: 'Move element'
  }
}