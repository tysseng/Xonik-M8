import { OrderedMap } from 'immutable';

const nodes = (state = OrderedMap(), action) => {
  switch (action.type){
    case 'SET_STATE':
      if(action.state.nodes){
        return state.clear().merge(action.state.nodes);
      }
      return state;
    default: 
      return state;
  }
}

export default nodes