import {createStore, combineReducers} from 'redux';
import nodes from './nodes';
import matrix from './matrix';

const serverReducers = combineReducers({
  nodes,
  matrix
});

let store = createStore(serverReducers);

export default store;