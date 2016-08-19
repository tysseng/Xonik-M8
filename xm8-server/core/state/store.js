import {createStore, combineReducers, applyMiddleware} from 'redux';
import graph from './graph';
import patchview from './patchview';
import network from './network';
import filesystem from './filesystem';
import { virtualInputs, physicalInputs } from './inputs';
import matrix from './matrix';
import inputgroups from './inputgroups';
import controllers from './controllers';
import reduxSubscribeMiddleware from '../../shared/state/redux-subscribe';

const serverReducers = combineReducers({
  controllers,
  graph,
  patchview,
  filesystem,
  network,
  virtualInputs,
  physicalInputs,
  matrix,
  inputgroups  
});

const createStoreWithMiddleware = applyMiddleware(reduxSubscribeMiddleware)(createStore);
const store = createStoreWithMiddleware(serverReducers);
export default store;