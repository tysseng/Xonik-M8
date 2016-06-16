export const toggleMode = (mode) => {
  return {
    type: 'MATRIX_TOGGLE_MODE',
    target: 'GUI',
    mode
  };
}