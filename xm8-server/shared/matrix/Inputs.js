/***

Inputs as an abstraction layer between physical panel pots/switches, midi input and the matrix.

- It maps physical controllers to positions in the matrix input array
- It maps virtual controllers to positions in the matrix input array
- It maps midi controllers to positions in the matrix input array

Physical controllers have a default name, range, set of values etc. An input mapped to a physical controller
will use these by default, but it is possible to override all aspects of an input.

The inputs are structured in logical groups such as all vco 1 functions, all vcf 1 functions. This grouping
is used for displaying various controller pages in the gui and is also customizable.

Finally, it is possible to add pure virtual inputs, without any midi or physical controller connected. These
can be controlled from the webapp only. An usefull example would be to have separate envelopes for each waveform
of each VCO. Having 9 VCO envelopes in midi and on the synth front panel would be overkill, but it be no problem
having an extra page in the gui for these.

NB: The hardware id should not be a configurable value. It should be assigned automatically upon matrix serialization.
***/

import _ from 'lodash';
import { panelControllers } from "./PanelControllers";

const getInput = (id, type, controller) => {
  return {
    id,
    type,
    panelController: controller,
    name: controller.name,
    midi: controller.midi
  }
}

let OSC_1_SQUARE = getInput('OSC_1_SQUARE', 'range', panelControllers.OSC_1_SQUARE);
let OSC_1_SAW = getInput('OSC_1_SAW', 'range', panelControllers.OSC_1_SAW);
let OSC_1_TRIANGLE = getInput('OSC_1_TRIANGLE', 'range', panelControllers.OSC_1_TRIANGLE);

let FILTER_1_CUTOFF = getInput('FILTER_1_CUTOFF', 'range', panelControllers.FILTER_1_CUTOFF);
let FILTER_1_RESONANCE = getInput('FILTER_1_RESONANCE', 'range', panelControllers.FILTER_1_RESONANCE);
let FILTER_1_SLOPE = getInput('FILTER_1_SLOPE', 'switch', panelControllers.FILTER_1_SLOPE);
let FILTER_1_MODE = getInput('FILTER_1_MODE', 'switch', panelControllers.FILTER_1_MODE);

let AMP_ENV_ATTACK = getInput('AMP_ENV_ATTACK', 'range', panelControllers.AMP_ENV_ATTACK);
let AMP_ENV_DECAY = getInput('AMP_ENV_DECAY', 'range', panelControllers.AMP_ENV_DECAY);
let AMP_ENV_SUSTAIN = getInput('AMP_ENV_SUSTAIN', 'range', panelControllers.AMP_ENV_SUSTAIN);
let AMP_ENV_RELEASE = getInput('AMP_ENV_RELEASE', 'range', panelControllers.AMP_ENV_RELEASE);

let FILTER_1_ENV_ATTACK = getInput('FILTER_1_ENV_ATTACK', 'range', panelControllers.FILTER_1_ENV_ATTACK);
let FILTER_1_ENV_DECAY = getInput('FILTER_1_ENV_DECAY', 'range', panelControllers.FILTER_1_ENV_DECAY);
let FILTER_1_ENV_SUSTAIN = getInput('FILTER_1_ENV_SUSTAIN', 'range', panelControllers.FILTER_1_ENV_SUSTAIN);
let FILTER_1_ENV_RELEASE = getInput('FILTER_1_ENV_RELEASE', 'range', panelControllers.FILTER_1_ENV_RELEASE);


let inputs = [
  OSC_1_SQUARE,
  OSC_1_SAW,
  OSC_1_TRIANGLE,
  FILTER_1_CUTOFF,
  FILTER_1_RESONANCE,
  FILTER_1_SLOPE,
  FILTER_1_MODE,
  AMP_ENV_ATTACK,
  AMP_ENV_DECAY,
  AMP_ENV_SUSTAIN,
  AMP_ENV_RELEASE,
  FILTER_1_ENV_ATTACK,
  FILTER_1_ENV_DECAY,
  FILTER_1_ENV_SUSTAIN,
  FILTER_1_ENV_RELEASE  
];

// TODO: Physical controllers must be mapped to inputs (hw id) by the voice controller (NOT by the main controller) as each
// voice can have a different input mapping. Is this overly complex?
// TODO: Keep controller values separate from controller definitions in state, to eliminate the need to traverse/deep update
// state.

// add a sort order key to be able to sort inputsById later
let sortKey = 0;

let inputsById = {};
_.each(inputs, input => {
  input.sortKey = sortKey++;
  inputsById[input.id] = input;
});

let inputGroups = [  
  {
    name: 'Oscillator 1',
    type: 'group',
    children: [OSC_1_SQUARE.id, OSC_1_SAW.id, OSC_1_TRIANGLE.id]
  },  
  {
    name: 'Filter 1',
    type: 'group',
    children: [FILTER_1_CUTOFF.id, FILTER_1_RESONANCE.id, FILTER_1_SLOPE.id, FILTER_1_RESONANCE.id]
  },  
  {
    name: 'Amplifier envelope',
    type: 'group',
    children: [AMP_ENV_ATTACK.id, AMP_ENV_DECAY.id, AMP_ENV_SUSTAIN.id, AMP_ENV_RELEASE.id]
  },
  {
    name: 'Filter 1 envelope',
    type: 'group',
    children: [FILTER_1_ENV_ATTACK.id, FILTER_1_ENV_DECAY.id, FILTER_1_ENV_SUSTAIN.id, FILTER_1_ENV_RELEASE.id]
  }    
];

export {inputsById, inputGroups, inputs}; 

export default inputs;