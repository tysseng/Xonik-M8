import { OrderedMap, Map } from 'immutable';
import { getUpdatedState } from './reducerTools';

const nodes = (state, action) => {
  switch (action.type){
    case 'SET_STATE':
      let updatedState = getUpdatedState(['patches', '0', 'graph'], action);
      if(updatedState){
        return state.clear().merge(updatedState);
      }
      return state;
    default: 
      return state;
  }
}

export const emptyState = Map({
  nodes: OrderedMap(),
  outputs: Map()
});

export default nodes