import { currentVoiceGroupId } from '../voicegroupselector';

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

export const undo = (undoGroup, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.UNDO,
    undoGroup,
    patchNumber
  }
}

export const redo = (undoGroup, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.REDO,
    undoGroup,
    patchNumber
  }
}