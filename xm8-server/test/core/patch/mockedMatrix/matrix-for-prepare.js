import { init as initNodes, invert, output, sum, param, link, name, getMutableNodes } from '../mockedNodes/nodesTestTools';
import { init, toggle, getMutableMatrix} from './matrixTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { inputsById } from '../../../../shared/graph/Inputs';
import { outputsById } from '../../../../shared/graph/Outputs';

init();
initNodes();

// a graph that uses a physical input, to test collisions with matrix
let outputNode = output(outputsById.OUT_VCO_1_PITCH);
param(outputNode, '0', paramTypesMap.CONSTANT.id, 1);

//toggle(inputsById.)

export default graph;