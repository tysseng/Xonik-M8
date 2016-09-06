import { combineReducers } from 'redux';
import patches from './patches';
import links from './links';
import patchviews from './patchviews';
import network from './network';
import filesystem from './filesystem';
import filedialog from './filedialog';
import { physicalInputs } from './inputs';
import controllers from './controllers';

const guiReducers = combineReducers({
  controllers,
  patches,
  links,
  patchviews,
  filedialog,
  filesystem,
  network,
  physicalInputs
});

export default guiReducers;