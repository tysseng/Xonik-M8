export const types = {
  DIRECT_OUTPUT_TOGGLE: 'DIRECT_OUTPUT_TOGGLE',
  DIRECT_OUTPUT_HOVER: 'DIRECT_OUTPUT_HOVER'
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




