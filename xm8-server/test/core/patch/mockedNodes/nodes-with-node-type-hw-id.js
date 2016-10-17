import { init, sum, output, param, link, getMutableNodes } from './nodesTestTools';
import { paramTypesById } from '../../../../shared/graph/ParameterTypes';
import { outputsById } from '../../../../shared/graph/Outputs';

import { filterEnvRelease, filterCutoff } from '../mockedInputs/physical-inputs-for-node-testing';

init();

let sum1 = sum();
param(sum1, '0', paramTypesById.INPUT, filterEnvRelease.id);
param(sum1, '1', paramTypesById.INPUT, filterCutoff.id);

let outputNode = output(outputsById.OUT_VCO_1_PITCH);
link(sum1, outputNode, '0');

let graph = getMutableNodes();

export default graph;