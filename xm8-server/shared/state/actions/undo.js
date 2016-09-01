export const groups = {
  GRAPH: 'GRAPH',
  INPUTGROUPS: 'INPUTGROUPS',
  PHYSICAL_INPUTS: 'PHYSICAL_INPUTS',
  VIRTUAL_INPUTS: 'VIRTUAL_INPUTS',
  MATRIX: 'MATRIX',
  PATCH: 'PATCH'
}

export const types = {
  UNDO: 'UNDO',
  REDO: 'REDO',
  SET_UNDO_POINT: 'SET_UNDO_POINT'
}

export const undo = (undoGroup, undoSubGroup) => {
  return {
    type: types.UNDO,
    undoGroup,
    undoSubGroup
  }
}

export const redo = (undoGroup, undoSubGroup) => {
  return {
    type: types.REDO,
    undoGroup,
    undoSubGroup
  }
}