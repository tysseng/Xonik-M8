export const setState = (state) => {  
  return {
    type: 'SET_STATE',
    target: 'GUI',
    state
  };
}