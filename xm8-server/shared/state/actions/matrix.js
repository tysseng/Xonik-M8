export const types = {
  DIRECT_OUTPUT_TOGGLE: 'DIRECT_OUTPUT_TOGGLE',
  RESET_MATRIX: 'RESET_MATRIX'
}

export const toggleDirectOutput = (inputId, outputId, patchNumber = '-') => {
  return {
    type: types.DIRECT_OUTPUT_TOGGLE,
    inputId,
    outputId,
    target: 'BOTH',
    patchNumber
  }
}

export const resetMatrix = (patchNumber = '-') => {
  return {
    type: types.RESET_MATRIX,
    target: 'SERVER',
    patchNumber
  }
};




