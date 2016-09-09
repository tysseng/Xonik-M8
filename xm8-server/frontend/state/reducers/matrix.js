import { Map } from 'immutable';
import { getUpdatedState } from './reducerTools';

const root = (state, action) => {
  switch(action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['matrix'], action);
      if(updatedState){
        return state.merge(updatedState);
      }
      return state;
    default:
      return state;
  }
}

export const emptyState = Map({
  directoutputs: Map({})
});

export default root;
