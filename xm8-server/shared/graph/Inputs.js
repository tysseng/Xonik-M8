/***

Inputs as an abstraction layer between physical panel pots/switches, midi input and the graph.

- It maps physical controllers to positions in the graph input array
- It maps virtual controllers to positions in the graph input array
- It maps midi controllers to positions in the graph input array

Physical controllers have a default name, range, set of values etc. An input mapped to a physical controller
will use these by default, but it is possible to override all aspects of an input.

The inputs are structured in logical groups such as all vco 1 functions, all vcf 1 functions. This grouping
is used for displaying various controller pages in the gui and is also customizable.

Finally, it is possible to add pure virtual inputs, without any midi or physical controller connected. These
can be controlled from the webapp only. An usefull example would be to have separate envelopes for each waveform
of each VCO. Having 9 VCO envelopes in midi and on the synth front panel would be overkill, but it be no problem
having an extra page in the gui for these.

NB: The hardware id should not be a configurable value. It should be assigned automatically upon graph serialization.
***/

import _ from 'lodash';
import { panelControllersById } from "./PanelControllers";
import { unitsById } from "./ParameterUnits";
import { inputTypesById as inputTypes } from "..//inputs/InputTypes";

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

// if centered is true, position is centered within step range.
// if endToEnd is true, the full scale is used, first step is = 0 and last step is max value.
// i.e. if range is split into two positions, midi will have values
// - centered=false: 0, 64
// - centered=true: 32, 96
// - endToEnd=true: 0, 127
//
// PS: combining centered and endToEnd makes no sense
export const getStepPositions = ({numberOfSteps, centered = false, min = 0, max = 32768, endToEnd = false}) => {
  let positions = [];

  let offset = centered ? 0.5 : 0;
  let range = endToEnd ? Math.floor(max - min) : Math.floor(max - min);
  
  let partitions = endToEnd ? numberOfSteps -1 : numberOfSteps;

  let stepWidth = range / partitions;
  let stepWidthMidi = Math.floor(128 / partitions);

  let value = 0;
  let valuemidi = 0;

  for(let i=0; i<numberOfSteps; i++){

    let value = min + Math.floor((i + offset) * stepWidth);

    positions.push({
      value,
      valuemidi: Math.floor((i + offset) * stepWidthMidi)
    });
  } 

  return positions;
}

const getOptions = (controller) => {

  if(!controller.options){
    return {};
  }

  let steps = getStepPositions({numberOfSteps: controller.options.length});
  let options = {};
  let currentOption = 0;

  // Send will always send the defined value
  // Receive will interpret anything from an option's value and to the next option's value -1 as the option.
  // Receive will interpret anything between 0 and the first option's value as the first option.
  _.each(controller.options, option => {
    options['' + currentOption] = {
      index: '' + currentOption,
      id: option.id,
      label: option.label,
      value: steps[currentOption].value,
      valuemidi: steps[currentOption].valuemidi
    };

    currentOption++;

  });  

  return options;
}

const getInput = (id, type, controller) => {

  let midi = controller.midi;
  midi.hires = false;
  midi.send = true;
  midi.receive = true;

  let options = getOptions(controller);
  let optionsLength = Object.keys(options).length;

  return {
    id,
    type,
    scale: unitsById.DAC_VALUE.id,
    panelController: controller.id,
    name: controller.name,
    midi: midi,
    value: 0,
    min: '',
    max: '',
    stepGenerationMode: optionsLength > 0 ? 'OPTIONS' : 'CONTINOUS', // TODO: Turn into constant
    stepInterval: '',
    numberOfSteps: '',
    options
  }
}


let OSC_1_SQUARE = getInput('OSC_1_SQUARE', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_OSC_1_SQUARE);
let OSC_1_SAW = getInput('OSC_1_SAW', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_OSC_1_SAW);
let OSC_1_TRIANGLE = getInput('OSC_1_TRIANGLE', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_OSC_1_TRIANGLE);

let FILTER_1_CUTOFF = getInput('FILTER_1_CUTOFF', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_CUTOFF);
let FILTER_1_RESONANCE = getInput('FILTER_1_RESONANCE', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_RESONANCE);
let FILTER_1_SLOPE = getInput('FILTER_1_SLOPE', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_SLOPE);
let FILTER_1_MODE = getInput('FILTER_1_MODE', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_MODE);

let AMP_ENV_ATTACK = getInput('AMP_ENV_ATTACK', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_AMP_ENV_ATTACK);
let AMP_ENV_DECAY = getInput('AMP_ENV_DECAY', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_AMP_ENV_DECAY);
let AMP_ENV_SUSTAIN = getInput('AMP_ENV_SUSTAIN', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_AMP_ENV_SUSTAIN);
let AMP_ENV_RELEASE = getInput('AMP_ENV_RELEASE', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_AMP_ENV_RELEASE);

let FILTER_1_ENV_ATTACK = getInput('FILTER_1_ENV_ATTACK', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_ENV_ATTACK);
let FILTER_1_ENV_DECAY = getInput('FILTER_1_ENV_DECAY', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_ENV_DECAY);
let FILTER_1_ENV_SUSTAIN = getInput('FILTER_1_ENV_SUSTAIN', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_ENV_SUSTAIN);
let FILTER_1_ENV_RELEASE = getInput('FILTER_1_ENV_RELEASE', inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_ENV_RELEASE);




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

/*
  return Map({
    id,
    groupId,
    elementId,
    offset: Map({
      x: offsetXem,
      y: offsetYem
    })
  }
*/

const createGroup = (id, name) => {
  return {
    id,
    name,
    elements: {}
  }
}

const addInput = (group, input, x, y) => {
  group.elements[input.id] = {
    id: input.id,
    groupId: group.id,
    elementId: input.id,
    offset: {
      x,
      y
    }
  }
}

let osc1 = createGroup('OSC_1', 'Oscillator 1');
addInput(osc1, OSC_1_SQUARE, 0, 0);
addInput(osc1, OSC_1_SAW, 4, 0);
addInput(osc1, OSC_1_TRIANGLE, 8, 0);

let filter1 = createGroup('FILTER_1', 'Filter 1');
addInput(filter1, FILTER_1_CUTOFF, 0, 0);
addInput(filter1, FILTER_1_RESONANCE, 4, 0);
addInput(filter1, FILTER_1_SLOPE, 8, 0);
addInput(filter1, FILTER_1_RESONANCE, 12, 0);

let ampEnv = createGroup('AMP_ENV', 'Amplifier envelope');
addInput(ampEnv, AMP_ENV_ATTACK, 0, 0);
addInput(ampEnv, AMP_ENV_DECAY, 4, 0);
addInput(ampEnv, AMP_ENV_SUSTAIN, 8, 0);
addInput(ampEnv, AMP_ENV_RELEASE, 12, 0);

let filter1env = createGroup('FILTER_1_ENV', 'Filter 1 envelope');
addInput(filter1env, FILTER_1_ENV_ATTACK, 0, 0);
addInput(filter1env, FILTER_1_ENV_DECAY, 4, 0);
addInput(filter1env, FILTER_1_ENV_SUSTAIN, 8, 0);
addInput(filter1env, FILTER_1_ENV_RELEASE, 12, 0);

let inputGroups = {
  osc1,
  filter1,
  ampEnv,
  filter1env
};

sortKey = 0;
let inputGroupsById = {};
_.each(inputGroups, group => {
  group.sortKey = sortKey++;
  inputGroupsById[group.id] = group;
});

export {getInput, inputs, inputsById, inputGroups, inputGroupsById}; 

export const virtualInputGroupIdPrefix = 'virtgroup|';
export const virtualInputIdPrefix = 'virt|';

export default inputs;