import { init, invert, output, delay, link, getMutableNodes } from './nodesTestTools';
import { outputsById } from '../../../../shared/graph/Outputs';

// patch with a loop through a delay node: node0->node1->delayNode->node0
init();

let node0 = invert();
let node1 = invert();
link(node0, node1, '0');

let outputNode = output(outputsById.OUT_VCO_1_PITCH);
link(node1, outputNode, '0');

let delayNode = delay();
link(node1, delayNode, '0');
link(delayNode, node0, '0');

let graph = getMutableNodes();

export default graph;