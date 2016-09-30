import { init, sum, output, param, link, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';

init();

// Three linked nodes - NB: node 1 is the initial one: 1 -> 0 -> 2

let node0 = sum();
param(node0, '1', paramTypesMap.CONSTANT.id, '3', 'PERCENTAGE');

let node1 = sum();
param(node1, '0', paramTypesMap.CONSTANT.id, '1', 'PERCENTAGE');
param(node1, '1', paramTypesMap.CONSTANT.id, '2', 'PERCENTAGE');
link(node1, node0, '0');

let node2 = output('0');
link(node0, node2, '0');

let graph = getMutableNodes();

export default graph;