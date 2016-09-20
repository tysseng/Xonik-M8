import { init, invert, output, sum, param, link, getMutableNodes } from './graphTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';

/*
A graph that has been entered in a weird sequence.

node2 and node1 are summed by node3 in that order.
node3 and node5 are summed by node4
node0 outputs the result of node4

 */

init();

let outputNode = output('0');

let independent2 = invert();
param(independent2, '0', paramTypesMap.CONSTANT.id, '2');

let independent1 = invert();
param(independent1, '0', paramTypesMap.CONSTANT.id, '1');

let summer = sum();
link(independent1, summer, '0');
link(independent2, summer, '1');

let summer2 = sum();
link(summer2, outputNode, '0');

let independent3 = invert();
param(independent3, '0', paramTypesMap.CONSTANT.id, '4');
link(summer, summer2, '0');
link(independent3, summer2, '1');

let graph = getMutableNodes();

export default graph;