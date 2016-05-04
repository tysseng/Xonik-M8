import { combineReducers } from 'redux';
import nodes from './nodes';
import matrix from './matrix';

const guiReducers = combineReducers({
  nodes,
  matrix
});

export default guiReducers;