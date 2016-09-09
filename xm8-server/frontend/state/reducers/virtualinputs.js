import { Map } from 'immutable';
import { getUpdatedState } from './reducerTools';

export const emptyState = Map({
  byId: Map(),
  groups: Map()
});

const virtualInputs = (state, action) => {
  switch(action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['virtualInputs'], action);
      if(updatedState){
        return state.merge(updatedState);
      }
      return state;
    default:
      return state;
  }
}

export default virtualInputs;
