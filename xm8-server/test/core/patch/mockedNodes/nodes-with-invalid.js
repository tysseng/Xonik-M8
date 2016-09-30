import { init, invert, output, link, getMutableNodes } from './nodesTestTools';
import { outputsById } from '../../../../shared/graph/Outputs';

init();

let invalidNode = invert(); // missing input param
let outputNode = output(outputsById.VCO_1_PITCH);
link(invalidNode, outputNode, '0');

let graph = getMutableNodes();

export default graph;