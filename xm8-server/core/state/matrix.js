import { Map } from 'immutable';
import { types } from '../../shared/state/actions/matrix';
import { types as patchActionTypes } from '../../shared/state/actions/patch';

export const undoableActions = [
  types.DIRECT_OUTPUT_TOGGLE,
  patchActionTypes.RESET_PATCH,
  types.RESET_MATRIX
];

export let hasChanged = false;
const setHasChanged = () => hasChanged = true;
export const clearHasChanged = () => hasChanged = false;

const directoutputs = (state, action) => {
  switch(action.type){
    case types.DIRECT_OUTPUT_TOGGLE:
      let currentInputId = state.get(action.outputId);
      if(currentInputId === action.inputId){
        return state.delete(action.outputId);          
      } else {
        return state.set(action.outputId, action.inputId);          
      }      
  } 
  return state;
}

const root = (state, action) => {

  switch(action.type){
    case types.DIRECT_OUTPUT_TOGGLE:
      setHasChanged();
      return state.updateIn(['directoutputs'], substate => directoutputs(substate, action));
    case patchActionTypes.RESET_PATCH:
    case types.RESET_MATRIX:
      setHasChanged();
      return emptyState;
    default:
      return state;
  }
}

export const emptyState = Map({
  directoutputs: Map({})
});

export default root;
