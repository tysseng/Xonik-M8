export const groups = {
  GRAPH: 'GRAPH',
  INPUTGROUPS: 'INPUTGROUPS',
  PHYSICAL_INPUTS: 'PHYSICAL_INPUTS',
  VIRTUAL_INPUTS: 'VIRTUAL_INPUTS',
  MATRIX: 'MATRIX'
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