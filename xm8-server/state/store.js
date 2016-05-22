import {createStore, combineReducers} from 'redux';
import nodes from './nodes';
import matrix from './matrix';
import links from './links';

const serverReducers = combineReducers({
  nodes,
  links,
  matrix
});

let store = createStore(serverReducers);

export default store;