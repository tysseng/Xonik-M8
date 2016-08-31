import { Map } from 'immutable';
import { types } from '../../../shared/state/actions/matrix';
import { getUpdatedState } from './reducerTools';

const root = (
  state = getInitialState(),
  action) => {
  switch(action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['patches', '0', 'matrix'], action);
      if(updatedState){
        return state.merge(updatedState);
      }
      break;
    case types.DIRECT_OUTPUT_HOVER:
        return state.set('hover', Map({inputId: action.inputId, outputId: action.outputId}));
  } 
  return state;
}

export const getInitialState = () => {
  return Map({
    directoutputs: Map({
      
    }),
    hover: Map({inputId: '', outputId: ''})
  });
}

export default root;
