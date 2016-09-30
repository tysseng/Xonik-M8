import { init, invert, output, sum, param, link, name, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { outputsById } from '../../../../shared/graph/Outputs';

/*
A graph that has been entered in a weird sequence.
sorting should happen like this:
- Independent nodes are identified and ordered 3,2,1
- outputSummer is evaluated and found to not be complete as inputSummer has not been added  (consumers on independent 3)
- inputSummer is evaluated and found to be complete, added to independentNodes (consumers on independent 2)
- inputSummer is evaluated again and found to be added already  (consumers on independent 1)
- outputSummer is evaluated and found to be complete since inputSummer has been added (consumers on inputSummer). Added to independentNodes
- outputNode is evaluated and found to be complete. Added to sortedNodes

ORder should be
3 indep3, 4 indep2, 5 indep1, 2 inputSummer, 1 outputSummer, 0 outputNode


 */

init();

let outputNode = output(outputsById.OUT_VCO_1_PITCH);
name(outputNode, 'outputNode');

let outputSummer = sum();
name(outputSummer, 'outputSummer');

let inputSummer = sum();
name(inputSummer, 'inputSummer');

let independent3 = invert();
name(independent3, 'independent3');
param(independent3, '0', paramTypesMap.CONSTANT.id, '3');

let independent2 = invert();
name(independent2, 'independent2');
param(independent2, '0', paramTypesMap.CONSTANT.id, '2');

let independent1 = invert();
name(independent1, 'independent1');
param(independent1, '0', paramTypesMap.CONSTANT.id, '1');

link(independent1, inputSummer, '0');
link(independent2, inputSummer, '1');

link(inputSummer, outputSummer, '0');
link(independent3, outputSummer, '1');

link(outputSummer, outputNode, '0');

let graph = getMutableNodes();

export default graph;