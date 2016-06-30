export const changeValue = (id, value) => {
  return {
    type: 'CONTROLLER_CHANGE',
    id,
    value,
    target: 'BOTH'
  };  
}
