import {createStore, combineReducers, applyMiddleware} from 'redux';
import nodes from './nodes';
import graph from './graph';
import network from './network';
import filesystem from './filesystem';
import inputs from './inputs';
import inputgrid from './inputgrid';
import controllers from './controllers';
import reduxSubscribeMiddleware from '../../shared/state/redux-subscribe';

const serverReducers = combineReducers({
  nodes,
  graph,
  filesystem,
  network,
  inputs,
  inputgrid,
  controllers
});

const createStoreWithMiddleware = applyMiddleware(reduxSubscribeMiddleware)(createStore);

const store = createStoreWithMiddleware(serverReducers);

//let store = createStore(serverReducers);

export default store;