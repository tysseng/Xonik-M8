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

/*
const getOptions = (controller) => {

  if(!controller.options){
    return [];
  }

  let options = [];
  let optionsLength = controller.options.length;  
  let optionWidth = Math.floor(65536 / optionsLength);
  let optionWidthMidi = Math.floor(128 / optionsLength);

  let max = 65535;
  let maxMidi = 127;

  let lower = 0;
  let lowermidi = 0;

  let currentOption = 1;

  // Send will always send lower values, while receive is valid for any value within lower-upper range.
  _.each(controller.options, option => {

    let upper = (currentOption < optionsLength) ? currentOption * optionWidth - 1 : max;
    let uppermidi = (currentOption < optionsLength) ? currentOption * optionWidthMidi - 1 : maxMidi;

    console.log("norm", options.label, lower, upper);
    console.log("midi", options.label, lowermidi, uppermidi)

    options.push({
      id: option.id,
      label: option.label,
      lower,
      upper,
      lowermidi,
      uppermidi
    });

    currentOption++;
    lower = upper + 1;
    lowermidi = uppermidi + 1;
  });  

  return options;
}*/

const getNextIndex = (options) => {
  let highest = 0;
  _.each(options, option => {
    let index = parseInt(option.index);
    if(index > highest){
      highest = index;
    }
  });
  return highest + 1;  
}

export const getEmptyOption = (controller) => {

  let index = getNextIndex(controller.options);
  return {
    index: '' + index,
    id: '',
    label: '',
    value: '',
    valuemidi: ''
  };
}

const getOptions = (controller) => {

  if(!controller.options){
    return {};
  }

  let options = {};
  let optionsLength = controller.options.length;  
  let optionWidth = Math.floor(65536 / optionsLength);
  let optionWidthMidi = Math.floor(128 / optionsLength);

  let value = 0;
  let valuemidi = 0;

  let currentOption = 0;

  // Send will always send the defined value
  // Receive will interpret anything from an option's value and to the next option's value -1 as the option.
  // Receive will interpret anything between 0 and the first option's value as the first option.
  _.each(controller.options, option => {

    value = currentOption * optionWidth;
    valuemidi = currentOption * optionWidthMidi;

    options['' + currentOption] = {
      index: '' + currentOption,
      id: option.id,
      label: option.label,
      value,
      valuemidi
    };

    currentOption++;

  });  

  return options;
}

const getInput = (id, type, controller) => {

  let midi = controller.midi;
  midi.hires = false;

  return {
    id,
    type,
    panelController: controller,
    name: controller.name,
    midi: controller.midi,
    value: 0,
    options: getOptions(controller)
  }
}

let OSC_1_SQUARE = getInput('OSC_1_SQUARE', 'vertical_range', panelControllers.OSC_1_SQUARE);
let OSC_1_SAW = getInput('OSC_1_SAW', 'vertical_range', panelControllers.OSC_1_SAW);
let OSC_1_TRIANGLE = getInput('OSC_1_TRIANGLE', 'vertical_range', panelControllers.OSC_1_TRIANGLE);

let FILTER_1_CUTOFF = getInput('FILTER_1_CUTOFF', 'vertical_range', panelControllers.FILTER_1_CUTOFF);
let FILTER_1_RESONANCE = getInput('FILTER_1_RESONANCE', 'vertical_range', panelControllers.FILTER_1_RESONANCE);
let FILTER_1_SLOPE = getInput('FILTER_1_SLOPE', 'vertical_range', panelControllers.FILTER_1_SLOPE);
let FILTER_1_MODE = getInput('FILTER_1_MODE', 'vertical_range', panelControllers.FILTER_1_MODE);

let AMP_ENV_ATTACK = getInput('AMP_ENV_ATTACK', 'vertical_range', panelControllers.AMP_ENV_ATTACK);
let AMP_ENV_DECAY = getInput('AMP_ENV_DECAY', 'vertical_range', panelControllers.AMP_ENV_DECAY);
let AMP_ENV_SUSTAIN = getInput('AMP_ENV_SUSTAIN', 'vertical_range', panelControllers.AMP_ENV_SUSTAIN);
let AMP_ENV_RELEASE = getInput('AMP_ENV_RELEASE', 'vertical_range', panelControllers.AMP_ENV_RELEASE);

let FILTER_1_ENV_ATTACK = getInput('FILTER_1_ENV_ATTACK', 'vertical_range', panelControllers.FILTER_1_ENV_ATTACK);
let FILTER_1_ENV_DECAY = getInput('FILTER_1_ENV_DECAY', 'vertical_range', panelControllers.FILTER_1_ENV_DECAY);
let FILTER_1_ENV_SUSTAIN = getInput('FILTER_1_ENV_SUSTAIN', 'vertical_range', panelControllers.FILTER_1_ENV_SUSTAIN);
let FILTER_1_ENV_RELEASE = getInput('FILTER_1_ENV_RELEASE', 'vertical_range', panelControllers.FILTER_1_ENV_RELEASE);


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
    id: 'OSC_1',
    name: 'Oscillator 1',
    type: 'group',
    children: [OSC_1_SQUARE.id, OSC_1_SAW.id, OSC_1_TRIANGLE.id]
  },  
  {
    id: 'FILTER_1',
    name: 'Filter 1',
    type: 'group',
    children: [FILTER_1_CUTOFF.id, FILTER_1_RESONANCE.id, FILTER_1_SLOPE.id, FILTER_1_RESONANCE.id]
  },  
  {
    id: 'AMP_ENV',
    name: 'Amplifier envelope',
    type: 'group',
    children: [AMP_ENV_ATTACK.id, AMP_ENV_DECAY.id, AMP_ENV_SUSTAIN.id, AMP_ENV_RELEASE.id]
  },
  {
    id: 'FILTER_1_ENV',
    name: 'Filter 1 envelope',
    type: 'group',
    children: [FILTER_1_ENV_ATTACK.id, FILTER_1_ENV_DECAY.id, FILTER_1_ENV_SUSTAIN.id, FILTER_1_ENV_RELEASE.id]
  }    
];

sortKey = 0;
let inputGroupsById = {};
_.each(inputGroups, group => {
  group.sortKey = sortKey++;
  inputGroupsById[group.id] = group;
});

export {inputs, inputsById, inputGroups, inputGroupsById}; 

export default inputs;