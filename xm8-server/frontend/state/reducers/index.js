import { combineReducers } from 'redux';
import patches from './patches';
import links from './links';
import patchviews from './patchviews';
import network from './network';
import filesystem from './filesystem';
import { physicalInputs } from './inputs';
import controllers from './controllers';

import filedialog from './gui/filedialog';
import guipatchviews from './gui/guipatchviews';
import guiinputgroups from './gui/guiinputgroups';
import guicontrollers from './gui/guicontrollers';


const guiReducers = combineReducers({
  controllers,
  guicontrollers,
  patches,
  links,
  patchviews,
  guipatchviews,
  filedialog,
  filesystem,
  network,
  physicalInputs,
  guiinputgroups
});

export default guiReducers;