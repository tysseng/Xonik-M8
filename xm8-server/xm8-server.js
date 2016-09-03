import store from './core/state/store';
import { autosave as autosavePhysicalInputs } from './core/inputs/physicalInputsRepository';
import { autosave as autosavePatch } from './core/graph/patchRepository';

// Kickstart XM8!
// start autosaving various state
autosavePhysicalInputs();
autosavePatch();

// start web server
require('./web/server.js');
