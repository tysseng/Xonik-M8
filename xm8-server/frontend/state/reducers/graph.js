import { OrderedMap, Map } from 'immutable';
import { getUpdatedState } from './reducerTools';

const nodes = (state = getInitialState(), action) => {
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

export const getInitialState = () => {
  return Map({
    nodes: OrderedMap(),
    outputs: Map()
  });
}

export default nodes