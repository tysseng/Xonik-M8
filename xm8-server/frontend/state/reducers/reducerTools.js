import _ from 'lodash';
import { setState } from '../../../shared/state/actions/index';
import config from '../../../shared/config';

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

// converts patch number to string
export const getPatchNum = patchNumber => '' + patchNumber;

// Wraps a reducer in a per-patch construct that takes away the pain of reusing a
// reducer across several patches/voice groups
export const getPerPatchWrapper = ({
  emptyState,
  wrappedReducer,
  updateStatePath
}) => {
  return (state = emptyState, action) => {
    if(action.patchNumber) {
      return state.updateIn([action.patchNumber], subState => wrappedReducer(subState, action))
    } else if(action.type === 'SET_STATE') {
      for(let i=0; i<config.voices.numberOfGroups; i++) {

        // The sub reducers do not know what patch they are
        // working on. Extract state for a single patch and
        // send this to the sub reducer.
        let updatedState = getUpdatedState([updateStatePath, getPatchNum(i)], action);
        if (updatedState) {
          let subAction = setState(updatedState);
          state = state.updateIn([getPatchNum(i)], subState => wrappedReducer(subState, subAction))
        }
      }
      return state;
    } else {
      return state;
    }
  }
}
