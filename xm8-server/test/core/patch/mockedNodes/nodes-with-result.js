import { init, delay, output, param, result, link, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { outputsById } from '../../../../shared/graph/Outputs';
import { unitsById } from '../../../../shared/graph/ParameterUnits';

init();

let node0 = delay();
param(node0, '0', paramTypesMap.CONSTANT.id, 3, unitsById.OCTAVES.id);
result(node0, 2, unitsById.OCTAVES.id);

let node1 = output(outputsById.OUT_VCO_1_PITCH);
link(node0, node1, '0');

let graph = getMutableNodes();

export default graph;