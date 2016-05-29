import { combineReducers } from 'redux';
import nodes from './nodes';
import links from './links';
import matrix from './matrix';
import filesystem from './filesystem';

const guiReducers = combineReducers({
  nodes,
  links,
  matrix,
  filesystem
});

export default guiReducers;