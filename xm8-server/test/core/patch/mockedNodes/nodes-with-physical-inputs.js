import { init, sum, output, param, link, getMutableNodes } from './graphTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';

import { filterEnvRelease, filterCutoff } from '../mockedInputs/physical-inputs-for-node-testing';

init();

let sum1 = sum();
param(sum1, '0', paramTypesMap.INPUT.id, filterEnvRelease.id);
param(sum1, '1', paramTypesMap.INPUT.id, filterCutoff.id);

let outputNode = output('0');
link(sum1, outputNode, '0');

let graph = getMutableNodes();

export default graph;