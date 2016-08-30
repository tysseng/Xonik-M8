export const types = {
  DIRECT_OUTPUT_TOGGLE: 'DIRECT_OUTPUT_TOGGLE',
  DIRECT_OUTPUT_HOVER: 'DIRECT_OUTPUT_HOVER',
  RESET_MATRIX: 'RESET_MATRIX'
}

export const toggleDirectOutput = (inputId, outputId) => {
  return {
    type: types.DIRECT_OUTPUT_TOGGLE,
    inputId,
    outputId,
    target: 'BOTH'
  }
}

export const toggleHover = (inputId, outputId) => {
  return {
    type: types.DIRECT_OUTPUT_HOVER,
    inputId,
    outputId,
    target: 'GUI'
  }
}

export const resetMatrix = () => {
  return {
    type: types.RESET_MATRIX,
    target: 'SERVER'
  }
};




