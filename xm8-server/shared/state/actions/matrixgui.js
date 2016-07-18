export const types = {
  MATRIX_TOGGLE_MODE: 'MATRIX_TOGGLE_MODE'
}

export const toggleMode = (mode) => {
  return {
    type: types.MATRIX_TOGGLE_MODE,
    target: 'GUI',
    mode
  };
}