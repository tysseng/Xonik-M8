import { Map } from 'immutable';
import { types } from '../../../shared/state/actions/matrix';
import { getUpdatedState } from './reducerTools';

const root = (state, action) => {
  switch(action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['matrix'], action);
      if(updatedState){
        return state.merge(updatedState);
      }
      return state;
    case types.DIRECT_OUTPUT_HOVER:
      return state.set('hover', Map({inputId: action.inputId, outputId: action.outputId}));
    default:
      return state;
  }
}

export const emptyState = Map({
  directoutputs: Map({}),
  hover: Map({inputId: '', outputId: ''})
});


export default root;
