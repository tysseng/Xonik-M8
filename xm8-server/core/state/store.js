import {createStore, combineReducers, applyMiddleware} from 'redux';
import nodes from './nodes';
import matrix from './matrix';
import network from './network';
import filesystem from './filesystem';
import inputs from './inputs';
import reduxSubscribeMiddleware from '../../shared/state/redux-subscribe';

const serverReducers = combineReducers({
  nodes,
  matrix,
  filesystem,
  network,
  inputs
});

const createStoreWithMiddleware = applyMiddleware(reduxSubscribeMiddleware)(createStore);

const store = createStoreWithMiddleware(serverReducers);

//let store = createStore(serverReducers);

export default store;