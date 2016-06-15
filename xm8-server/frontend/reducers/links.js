import {OrderedMap} from 'immutable';

const links = (state = OrderedMap(), action) => {
  switch (action.type){
    case 'SET_STATE':
      return state.clear().merge(action.state.links);
    default: 
      return state;
  }
}

export default links