import { OrderedMap, Map } from 'immutable';

const nodes = (state = getInitialState(), action) => {
  switch (action.type){
    case 'SET_STATE':
      if(action.state['graph']){
        return state.clear().merge(action.state['graph']);
      }
      return state;
    default: 
      return state;
  }
}

const getInitialState = () => {
  return Map({
    nodes: OrderedMap(),
    outputs: Map()
  });
}

export default nodes