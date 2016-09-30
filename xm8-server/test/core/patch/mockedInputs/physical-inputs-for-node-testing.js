import { init, getMutablePhysicalInputs } from './inputTestTools';

init();

let physicalInputs = getMutablePhysicalInputs();

export let filterEnvRelease = physicalInputs.FILTER_1_ENV_RELEASE;
export let filterCutoff = physicalInputs.FILTER_1_CUTOFF;

export default physicalInputs;