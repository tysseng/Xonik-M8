import { init, delay, output, param, result, link, getMutableNodes } from './nodesTestTools';
import { paramTypesById } from '../../../../shared/graph/ParameterTypes';
import { outputsById } from '../../../../shared/graph/Outputs';
import { unitsById } from '../../../../shared/graph/ParameterUnits';

init();

let node0 = delay();
param(node0, '0', paramTypesById.CONSTANT, 3, unitsById.OCTAVES);
result(node0, 2, unitsById.OCTAVES);

let node1 = output(outputsById.OUT_VCO_1_PITCH);
link(node0, node1, '0');

let graph = getMutableNodes();

export default graph;