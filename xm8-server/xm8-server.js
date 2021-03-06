import store from './core/state/store';
import { autosave as autosavePhysicalInputs } from './core/inputs/physicalInputsRepository';
import { autosaver as patchAutosaver } from './core/patch/patchRepository';
import { autosaver as patchviewAutosaver } from './core/patch/patchviewRepository';
import { autosaver as controllerAutosaver } from './core/controller/controllerRepository';

// Kickstart XM8!
// start autosaving various state
autosavePhysicalInputs();
patchAutosaver.autosave();
patchviewAutosaver.autosave();
controllerAutosaver.autosave();

// start web server
require('./web/server.js');
