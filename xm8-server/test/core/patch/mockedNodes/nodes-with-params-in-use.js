import { init, invert, sum, param, link, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';

init();

let node0 = invert();
param(node0, '0', paramTypesMap.CONSTANT, '1');

let node1 = sum();
param(node1, '1', paramTypesMap.CONSTANT, '2');
link(node0, node1, '0');

let graph = getMutableNodes();

export default graph;