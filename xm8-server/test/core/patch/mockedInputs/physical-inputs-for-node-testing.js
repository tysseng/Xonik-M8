import { init, getMutablePhysicalInputs } from '../../testHelpers/inputTestTools';

init();

let physicalInputs = getMutablePhysicalInputs();

export let filterEnvRelease = physicalInputs.IN_FILTER_1_ENV_RELEASE;
export let filterCutoff = physicalInputs.IN_FILTER_1_CUTOFF;

export default physicalInputs;