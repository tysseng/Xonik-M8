import { init, invert, output, param, link, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { outputsById } from '../../../../shared/graph/Outputs';

init();

let node0 = invert();
param(node0, '0', paramTypesMap.CONSTANT, 3);

let node1 = invert();
link(node0, node1, '0');

let node2 = output(outputsById.OUT_VCO_1_PITCH);
link(node1, node2, '0');

let graph = getMutableNodes();

export default graph;