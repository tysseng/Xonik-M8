import { init as initNodes, output, param, getMutableOutputs } from '../mockedNodes/nodesTestTools';
import { init, toggle, getMutableMatrix} from './matrixTestTools';
import { paramTypesById } from '../../../../shared/graph/ParameterTypes';
import { inputsById } from '../../../../shared/graph/Inputs';
import { outputsById } from '../../../../shared/graph/Outputs';

init();
initNodes();

// a graph that uses a physical input, to test collisions with matrix
let outputNode = output(outputsById.OUT_VCO_1_PITCH);
param(outputNode, '0', paramTypesById.CONSTANT, 1);

// a colliding direct output
toggle(inputsById.IN_OSC_1_SAW, outputsById.OUT_VCO_1_PITCH);

// two normal outputs
toggle(inputsById.IN_OSC_1_SQUARE, outputsById.OUT_FILTER_1_CUTOFF);
toggle(inputsById.IN_OSC_1_TRIANGLE, outputsById.OUT_FILTER_1_RESONANCE);

let matrix = getMutableMatrix();
let graphOutputs = getMutableOutputs();

export { matrix, graphOutputs };