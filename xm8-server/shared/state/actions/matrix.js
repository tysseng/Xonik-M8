export const types = {
  DIRECT_OUTPUT_TOGGLE: 'DIRECT_OUTPUT_TOGGLE',
  DIRECT_OUTPUT_HOVER: 'DIRECT_OUTPUT_HOVER',
  RESET_MATRIX: 'RESET_MATRIX'
}

export const toggleDirectOutput = (inputId, outputId, patchNumber = '0') => {
  return {
    type: types.DIRECT_OUTPUT_TOGGLE,
    inputId,
    outputId,
    target: 'BOTH',
    patchNumber
  }
}

export const toggleHover = (inputId, outputId, patchNumber = '0') => {
  return {
    type: types.DIRECT_OUTPUT_HOVER,
    inputId,
    outputId,
    target: 'GUI',
    patchNumber
  }
}

export const resetMatrix = (patchNumber = '0') => {
  return {
    type: types.RESET_MATRIX,
    target: 'SERVER',
    patchNumber
  }
};




