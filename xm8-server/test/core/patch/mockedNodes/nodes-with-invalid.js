import { init, sum, invert, output, param, link, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { unitsById } from '../../../../shared/graph/ParameterUnits';
import { inputsById } from '../../../../shared/graph/Inputs';

init();

let invalidNode = invert(); // missing input param
let outputNode = output('0');
link(invalidNode, outputNode, '0');

let graph = getMutableNodes();

export default graph;