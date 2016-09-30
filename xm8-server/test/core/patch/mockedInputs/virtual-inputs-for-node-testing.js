import { init, createVirtualInput, name, panelController, getMutableVirtualInputs } from './inputTestTools';
import { panelControllersById} from '../../../../shared/graph/PanelControllers';

init();

export let pureVirtual1 = createVirtualInput();
name(pureVirtual1, 'Pure virtual 1');

export let virtualWithPhysical = createVirtualInput();
name(virtualWithPhysical, 'Virtual with physical');
panelController(virtualWithPhysical, panelControllersById.PC_OSC_1_SQUARE.id);

export let pureVirtual2 = createVirtualInput();
name(pureVirtual2, 'Pure virtual 2');

export let pureVirtual3 = createVirtualInput();
name(pureVirtual3, 'Pure virtual 3');

let virtualInputs = getMutableVirtualInputs();

export default virtualInputs;