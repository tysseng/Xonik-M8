import {createStore, combineReducers} from 'redux';
import nodes from './nodes';
import matrix from './matrix';
import filesystem from './filesystem';

const serverReducers = combineReducers({
  nodes,
  matrix,
  filesystem
});

let store = createStore(serverReducers);

export default store;