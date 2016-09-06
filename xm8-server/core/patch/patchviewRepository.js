import config from '../../shared/config.js';

import changeTracker from '../state/patchviewChangeTracker';
import { initPatchAutosaver } from '../autosave/autosaver';
import { getPatchview } from '../state/selectors';

export const autosaver = initPatchAutosaver(changeTracker, getPatchview, config.persistence.autosave.patchviews.file);
