export const types = {
  GRAPH_TOGGLE_MODE: 'GRAPH_TOGGLE_MODE'
}

export const toggleMode = (mode, patchNumber = '0') => {
  return {
    type: types.GRAPH_TOGGLE_MODE,
    target: 'GUI',
    mode,
    patchNumber
  };
}