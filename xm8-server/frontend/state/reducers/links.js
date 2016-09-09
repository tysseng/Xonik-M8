import {OrderedMap} from 'immutable';

const links = (state = OrderedMap(), action) => {
  switch (action.type){
    case 'SET_STATE':
      if(action.state.links){
        return state.clear().merge(action.state.links);
      }
      return state;
    default: 
      return state;
  }
}

export default links