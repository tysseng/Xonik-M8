import { init, invert, sum, param, link, getMutableNodes } from './nodesTestTools';
import { paramTypesById } from '../../../../shared/graph/ParameterTypes';

init();

let node0 = invert();
param(node0, '0', paramTypesById.CONSTANT, '1');

let node1 = sum();
param(node1, '1', paramTypesById.CONSTANT, '2');
link(node0, node1, '0');

let graph = getMutableNodes();

export default graph;