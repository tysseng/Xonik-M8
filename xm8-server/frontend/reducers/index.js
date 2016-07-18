import { combineReducers } from 'redux';
import nodes from './nodes';
import links from './links';
import graph from './graph';
import network from './network';
import filesystem from './filesystem';
import filedialog from './filedialog';
import inputs from './inputs';
import inputgrid from './inputgrid';
import controllers from './controllers';

const guiReducers = combineReducers({
  nodes,
  links,
  graph,
  filedialog,
  filesystem,
  network,
  inputs,
  inputgrid,
  controllers
});

export default guiReducers;