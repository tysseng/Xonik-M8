import { currentVoiceGroupId } from '../voicegroupselector';

export const types = {
  GRAPH_TOGGLE_MODE: 'GRAPH_TOGGLE_MODE'
}

export const toggleMode = (mode, patchNumber = currentVoiceGroupId()) => {
  return {
    type: types.GRAPH_TOGGLE_MODE,
    target: 'GUI',
    mode,
    patchNumber
  };
}