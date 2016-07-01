import { combineReducers } from 'redux';
import nodes from './nodes';
import links from './links';
import matrix from './matrix';
import network from './network';
import filesystem from './filesystem';
import filedialog from './filedialog';
import inputs from './inputs';
import controllers from './controllers';

const guiReducers = combineReducers({
  nodes,
  links,
  matrix,
  filedialog,
  filesystem,
  network,
  inputs,
  controllers
});

export default guiReducers;