/**
 * @param path An array of object properties to traverse to find updated state
 * @param action Action containing a state property
 * @returns The state found at the end of the path or undefined if path is not in action
 */
export const getUpdatedState = (path, action) => {

  let state = action.state;

  _.each(path, pathElement => {
    if(state[pathElement]){
      state = state[pathElement];
    } else {
      state = undefined;
      return false;
    }
  });

  return state;
}
