import {Map, List, fromJS} from 'immutable';
import knownNetsRepo from '../wifi/knownNets';

const known = (state, action) => {
  switch (action.type){
    default: 
      return state;
  }  
}

const network = (state = 
  Map({
    current: Map(),
    builtIn: Map(),
    known: fromJS(knownNetsRepo.list()), 
    available: List()
  }), action) => {
  switch (action.type){
    case 'NETWORK_LOAD_KNOWN_FROM_DISK':
      set('known', known(state.known, action));
    default: 
      return state;
  }
}

export default network