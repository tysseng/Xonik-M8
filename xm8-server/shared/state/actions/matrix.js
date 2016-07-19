export const types = {
  DIRECT_OUTPUT_TOGGLE: 'DIRECT_OUTPUT_TOGGLE'
}

export const toggleDirectOutput = (inputId, outputId) => {
  return {
    type: types.DIRECT_OUTPUT_TOGGLE,
    inputId,
    outputId,
    target: 'SERVER'
  }
}





