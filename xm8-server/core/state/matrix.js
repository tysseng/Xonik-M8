import { Map } from 'immutable';
import { types } from '../../shared/state/actions/matrix';
import { getUndoWrapper } from './undo';
import { groups as undoGroups } from '../../shared/state/actions/undo';

const directoutputs = (state, action) => {
  switch(action.type){
    case types.DIRECT_OUTPUT_TOGGLE: 
      let currentInputId = state.get(action.outputId);
      if(currentInputId === action.inputId){
        return state
          .delete(action.outputId)
          .set('latestToggle', Map({inputId: action.inputId, outputId: action.outputId}));
      } else {
        return state
          .set(action.outputId, action.inputId)
          .set('latestToggle', Map({inputId: action.inputId, outputId: action.outputId}));
      }      
  } 
  return state;
}

const root = (
  state = getInitialState(),
  action) => {
  switch(action.type){
    case types.DIRECT_OUTPUT_TOGGLE:
      return state.updateIn(['directoutputs'], substate => directoutputs(substate, action));
  } 
  return state;
}

const getInitialState = () => {
  return Map({
    directoutputs: Map({
      latestToggle: Map({inputId: '', outputId: ''})
    })
  });
}

const undoableActions = [

];

const undoWrapper = getUndoWrapper(undoGroups.MATRIX, undoableActions, root, getInitialState);

export default undoWrapper;
