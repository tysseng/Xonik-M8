import { init, invert, output, delay, link, getMutableNodes } from './nodesTestTools';

// patch with a loop through a delay node: node0->node1->delayNode->node0
init();

let node0 = invert();
let node1 = invert();
link(node0, node1, '0');

let outputNode = output('0');
link(node1, outputNode, '0');

let delayNode = delay();
link(node1, delayNode, '0');
link(delayNode, node0, '0');

let graph = getMutableNodes();

export default graph;