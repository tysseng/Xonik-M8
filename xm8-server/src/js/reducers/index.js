import { combineReducers } from 'redux';
import nodes from './nodes';
import links from './links';
import matrix from './matrix';

const guiReducers = combineReducers({
  nodes,
  links,
  matrix
});

export default guiReducers;