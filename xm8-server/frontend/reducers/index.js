import { combineReducers } from 'redux';
import nodes from './nodes';
import links from './links';
import matrix from './matrix';
import filesystem from './filesystem';
import filedialog from './filedialog';

const guiReducers = combineReducers({
  nodes,
  links,
  matrix,
  filedialog,
  filesystem
});

export default guiReducers;