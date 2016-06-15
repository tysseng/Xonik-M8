import {OrderedMap} from 'immutable';

const nodes = (state = OrderedMap(), action) => {
  switch (action.type){
    case 'SET_STATE':
      return state.clear().merge(action.state.nodes);
    default: 
      return state;
  }
}

export default nodes