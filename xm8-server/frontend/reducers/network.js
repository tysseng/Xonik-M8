import {Map, List} from 'immutable';

const network = (state = 
  Map({
    current: Map(),
    builtIn: Map(),
    known: List(), 
    available: List()
  }), action) => {
  switch (action.type){
    case 'SET_STATE':
      if(action.state.network){
        return state.clear().merge(action.state.network);
      }          
    default: 
      return state;
  }
}

export default network