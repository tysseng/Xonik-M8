import { init, invert, output, outputTuned, delay, param, link, name, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { outputsById } from '../../../../shared/graph/Outputs';

init();

let unreachableNode = invert();
name(unreachableNode, "Unreachable");
param(unreachableNode, '0', paramTypesMap.CONSTANT.id, '2');

let reachableOutput = output(outputsById.OUT_VCO_1_PITCH);
param(reachableOutput, '0', paramTypesMap.CONSTANT.id, '10');
name(reachableOutput, "Reachable");

let reachableOutputTuned = outputTuned(outputsById.OUT_VCO_2_PITCH);
param(reachableOutputTuned, '0', paramTypesMap.CONSTANT.id, '2');
name(reachableOutputTuned, "Reachable 2");

let reachableDelay = delay();
name(reachableDelay, "Reachable 3");

let reachableByLink = invert();
name(reachableByLink, "Reachable by link");
link(reachableByLink, reachableDelay, '0');

let graph = getMutableNodes();

export default graph;