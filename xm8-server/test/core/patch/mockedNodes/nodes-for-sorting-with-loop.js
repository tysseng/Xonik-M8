import { init, invert, output, delay, link, name, getMutableNodes } from './nodesTestTools';
import { outputsById } from '../../../../shared/graph/Outputs';

/*
A graph with a loop - invert1 is an independent node as it only depends on the delay node
 */

init();

let outputNode = output(outputsById.VCO_1_PITCH);
name(outputNode, 'outputNode');

let invert2 = invert();
name(invert2, 'invert2');

let invert1 = invert();
name(invert1, 'invert1');

let delayNode = delay();
name(delayNode, 'delayNode');

// loop
link(invert1, invert2, '0');
link(invert2, delayNode, '0');
link(delayNode, invert1, '0');

link(invert2, outputNode, '0');

let graph = getMutableNodes();

export default graph;