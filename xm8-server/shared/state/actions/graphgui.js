export const types = {
  GRAPH_TOGGLE_MODE: 'GRAPH_TOGGLE_MODE'
}

export const toggleMode = (mode) => {
  return {
    type: types.GRAPH_TOGGLE_MODE,
    target: 'GUI',
    mode
  };
}