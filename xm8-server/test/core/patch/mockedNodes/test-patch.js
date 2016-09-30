/**
 * A patch that can be used for testing.
 * It has:
 * 1) A sum node that sums four inputs
 * - A constant, 12 semitones
 * - A constant, 1 volt
 * - A physical input (OSC 1 square)
 * - A virtual input ("A virtual input")
 *
 * 2) An invert node that links to the output of the sum node
 * 3) One normal output node that outputs the result of the invert node to VCO 1 pitch
 * 4) One output tuned node that outputs the result of the invert node to Filter 1 slope
 * 5) A matrix with one colliding output (Osc 1 square -> VCO 1 pitch)
 * 6) One non colliding output (Osc 1 saw -> VCO 2 pitch)
 * 7) One virtual input
 *   - linked to panel osc 1 square
 *   - outputs midi CC, 4 - foot controller and sends and receives hi-res midi.
 * 8) One virtual input without any link to midi or physical inputs
   */

import { init, invert, sum, output, outputTuned, param, link, getMutableNodes } from './nodesTestTools';
import { map as paramTypesMap } from '../../../../shared/graph/ParameterTypes';
import { inputsById } from '../../../../shared/graph/Inputs';
import { unitsById } from '../../../../shared/graph/ParameterUnits';
import { outputsById } from '../../../../shared/graph/Outputs';

init();

let node0 = sum();
param(node0, '0', paramTypesMap.CONSTANT.id, 12, unitsById.SEMITONES.id);
param(node0, '1', paramTypesMap.CONSTANT.id, 1, unitsById.VOLTS.id);
param(node0, '2', paramTypesMap.INPUT.id, inputsById.OSC_1_SQUARE.id);
param(node0, '3', paramTypesMap.INPUT.id, inputsById.OSC_1_SAW.id);

let node1 = invert();
link(node0, node1, '0');

let outputNode = output(outputsById.VCO_1_PITCH);
link(node1, outputNode, '0');

let outputTunedNode = outputTuned(outputsById.FILTER_1_RESONANCE);
link(node1, outputTunedNode, '0');

export default getMutableNodes;