import { init, invert, output, outputTuned, delay, param, link, name, getMutableNodes } from './graphTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';

init();

let unreachableNode = invert();
name(unreachableNode, "Unreachable");
param(unreachableNode, '0', paramTypesMap.CONSTANT.id, '2');

let reachableOutput = output('0');
param(reachableOutput, '0', paramTypesMap.CONSTANT.id, '10');
name(reachableOutput, "Reachable");

let reachableOutputTuned = outputTuned('1');
param(reachableOutputTuned, '0', paramTypesMap.CONSTANT.id, '2');
name(reachableOutputTuned, "Reachable 2");

let reachableDelay = delay();
name(reachableDelay, "Reachable 3");

let reachableByLink = invert();
name(reachableByLink, "Reachable by link");
link(reachableByLink, reachableDelay, '0');

let graph = getMutableNodes();

export default graph;