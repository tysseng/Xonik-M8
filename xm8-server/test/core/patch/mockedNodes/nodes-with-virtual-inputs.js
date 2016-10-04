import { init, invert, sum, output, param, link, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { outputsById } from '../../../../shared/graph/Outputs';

import  { pureVirtual1, pureVirtual2, pureVirtual3, virtualWithPhysical } from '../mockedInputs/virtual-inputs-for-node-testing';

init();

let sum1 = sum();
param(sum1, '0', paramTypesMap.VIRTUALINPUT, pureVirtual1.id);
param(sum1, '1', paramTypesMap.VIRTUALINPUT, virtualWithPhysical.id);

let sum2 = sum();
param(sum2, '0', paramTypesMap.VIRTUALINPUT, pureVirtual1.id); // already added by sum1
param(sum2, '1', paramTypesMap.VIRTUALINPUT, pureVirtual2.id);
link(sum1, sum2, '2');

let unreachableInvert = invert();
param(unreachableInvert, '0', paramTypesMap.VIRTUALINPUT, pureVirtual3.id); // pure virtual but unreachable node

let outputNode = output(outputsById.OUT_VCO_1_PITCH);
link(sum2, outputNode, '0');

let graph = getMutableNodes();

export default graph;