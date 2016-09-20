import { init, sum, invert, output, param, link, getMutableNodes } from './graphTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { unitsById } from '../../../../shared/graph/ParameterUnits';
import { inputsById } from '../../../../shared/graph/Inputs';

init();
// TODO, noe fishy her, denne er jo valid.

let node0 = sum();
param(node0, '0', paramTypesMap.CONSTANT.id, 12, unitsById.SEMITONES.id);
param(node0, '1', paramTypesMap.CONSTANT.id, 2, unitsById.VOLTS.id);
param(node0, '2', paramTypesMap.INPUT.id, inputsById.OSC_1_SQUARE.id);
param(node0, '3', paramTypesMap.VIRTUALINPUT.id, 'virt|30');

let node1 = invert();
link(node0, node1, '0');

let node2 = output('0');
link(node1, node2, '0');

let node3 = output('5');
link(node1, node3, '0');

let graph = getMutableNodes();

export default graph;