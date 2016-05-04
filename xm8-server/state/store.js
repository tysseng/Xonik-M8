import {createStore, combineReducers} from 'redux';
import nodes from './nodes';

const serverReducers = combineReducers({
  nodes
});

let store = createStore(serverReducers);

export default store;