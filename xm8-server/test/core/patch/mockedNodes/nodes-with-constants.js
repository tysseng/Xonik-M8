import { init, sum, output, param, link, getMutableNodes } from './nodesTestTools';
import { paramTypesById } from '../../../../shared/graph/ParameterTypes';
import { outputsById } from '../../../../shared/graph/Outputs';
import { unitsById } from '../../../../shared/graph/ParameterUnits';

init();

// Three linked nodes - NB: node 1 is the initial one: 1 -> 0 -> 2

let node0 = sum();
param(node0, '1', paramTypesById.CONSTANT, '3', unitsById.PERCENTAGE);

let node1 = sum();
param(node1, '0', paramTypesById.CONSTANT, '1', unitsById.PERCENTAGE);
param(node1, '1', paramTypesById.CONSTANT, '2', unitsById.PERCENTAGE);
link(node1, node0, '0');

let node2 = output(outputsById.OUT_VCO_1_PITCH);
link(node0, node2, '0');

let graph = getMutableNodes();

export default graph;