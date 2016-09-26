import { init, invert, sum, output, param, link, getMutableNodes } from './graphTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';

import  { pureVirtual1, pureVirtual2, pureVirtual3, virtualWithPhysical } from '../mockedInputs/virtual-inputs-for-node-testing';

init();

let sum1 = sum();
param(sum1, '0', paramTypesMap.VIRTUALINPUT.id, pureVirtual1.id);
param(sum1, '1', paramTypesMap.VIRTUALINPUT.id, virtualWithPhysical.id);

let sum2 = sum();
param(sum2, '0', paramTypesMap.VIRTUALINPUT.id, pureVirtual1.id); // already added by sum1
param(sum2, '1', paramTypesMap.VIRTUALINPUT.id, pureVirtual2.id);
link(sum1, sum2, '2');

let unreachableInvert = invert();
param(unreachableInvert, '0', paramTypesMap.VIRTUALINPUT.id, pureVirtual3.id); // pure virtual but unreachable node

let outputNode = output('0');
link(sum2, outputNode, '0');

let graph = getMutableNodes();

export default graph;