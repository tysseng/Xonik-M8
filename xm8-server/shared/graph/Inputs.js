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
import { inputTypesById as inputTypes } from "../inputs/InputTypes";

const getNextIndex = (options) => {
  if(options === undefined || Object.keys(options).length === 0){
    return 0;
  }

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

  let opt = {
    index: '' + index,
    id: '',
    label: '',
    value: '',
    valuemidi: ''
  };

  return opt;
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

const getInput = (type, controller) => {

  let midi = controller.midi;
  midi.hires = false;
  midi.send = true;
  midi.receive = true;

  let options = getOptions(controller);
  let optionsLength = Object.keys(options).length;

  return {
    type,
    scale: unitsById.DAC_VALUE.id,
    panelController: controller.id,
    inputPosition: controller.hwId,
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

const getInputWithId = (id, type, controller) => {
  let input = getInput(type, controller);
  input.id = id;
  return input;
}

let inputsById = {
  IN_OSC_1_SQUARE: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_OSC_1_SQUARE),
  IN_OSC_1_SAW: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_OSC_1_SAW),
  IN_OSC_1_TRIANGLE: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_OSC_1_TRIANGLE),

  IN_FILTER_1_CUTOFF: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_CUTOFF),
  IN_FILTER_1_RESONANCE: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_RESONANCE),
  IN_FILTER_1_SLOPE: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_SLOPE),
  IN_FILTER_1_MODE: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_MODE),

  IN_AMP_ENV_ATTACK: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_AMP_ENV_ATTACK),
  IN_AMP_ENV_DECAY: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_AMP_ENV_DECAY),
  IN_AMP_ENV_SUSTAIN: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_AMP_ENV_SUSTAIN),
  IN_AMP_ENV_RELEASE: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_AMP_ENV_RELEASE),

  IN_FILTER_1_ENV_ATTACK: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_ENV_ATTACK),
  IN_FILTER_1_ENV_DECAY: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_ENV_DECAY),
  IN_FILTER_1_ENV_SUSTAIN: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_ENV_SUSTAIN),
  IN_FILTER_1_ENV_RELEASE: getInput(inputTypes.VERTICAL_RANGE.id, panelControllersById.PC_FILTER_1_ENV_RELEASE)
}

// add ids to each object
_.each(inputsById, (input, id) => {
  input.id = id;
});

let inputs = [
  inputsById.IN_OSC_1_SQUARE,
  inputsById.IN_OSC_1_SAW,
  inputsById.IN_OSC_1_TRIANGLE,
  inputsById.IN_FILTER_1_CUTOFF,
  inputsById.IN_FILTER_1_RESONANCE,
  inputsById.IN_FILTER_1_SLOPE,
  inputsById.IN_FILTER_1_MODE,
  inputsById.IN_AMP_ENV_ATTACK,
  inputsById.IN_AMP_ENV_DECAY,
  inputsById.IN_AMP_ENV_SUSTAIN,
  inputsById.IN_AMP_ENV_RELEASE,
  inputsById.IN_FILTER_1_ENV_ATTACK,
  inputsById.IN_FILTER_1_ENV_DECAY,
  inputsById.IN_FILTER_1_ENV_SUSTAIN,
  inputsById.IN_FILTER_1_ENV_RELEASE
];

// TODO: Physical controllers must be mapped to inputs (hw id) by the voice controller (NOT by the main controller) as each
// voice can have a different input mapping. Is this overly complex?
// TODO: Keep controller values separate from controller definitions in state, to eliminate the need to traverse/deep update
// state.

// add an id

// add a sort order key to be able to sort inputsById later
let sortKey = 0;
_.each(inputs, input => {
  input.sortKey = sortKey++;
  inputsById[input.id] = input;
});

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
addInput(osc1, inputsById.IN_OSC_1_SQUARE, 0, 0);
addInput(osc1, inputsById.IN_OSC_1_SAW, 4, 0);
addInput(osc1, inputsById.IN_OSC_1_TRIANGLE, 8, 0);

let filter1 = createGroup('FILTER_1', 'Filter 1');
addInput(filter1, inputsById.IN_FILTER_1_CUTOFF, 0, 0);
addInput(filter1, inputsById.IN_FILTER_1_RESONANCE, 4, 0);
addInput(filter1, inputsById.IN_FILTER_1_SLOPE, 8, 0);
addInput(filter1, inputsById.IN_FILTER_1_RESONANCE, 12, 0);

let ampEnv = createGroup('AMP_ENV', 'Amplifier envelope');
addInput(ampEnv, inputsById.IN_AMP_ENV_ATTACK, 0, 0);
addInput(ampEnv, inputsById.IN_AMP_ENV_DECAY, 4, 0);
addInput(ampEnv, inputsById.IN_AMP_ENV_SUSTAIN, 8, 0);
addInput(ampEnv, inputsById.IN_AMP_ENV_RELEASE, 12, 0);

let filter1env = createGroup('FILTER_1_ENV', 'Filter 1 envelope');
addInput(filter1env, inputsById.IN_FILTER_1_ENV_ATTACK, 0, 0);
addInput(filter1env, inputsById.IN_FILTER_1_ENV_DECAY, 4, 0);
addInput(filter1env, inputsById.IN_FILTER_1_ENV_SUSTAIN, 8, 0);
addInput(filter1env, inputsById.IN_FILTER_1_ENV_RELEASE, 12, 0);

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

export { getInputWithId, inputs, inputsById, inputGroups, inputGroupsById };

export const virtualInputGroupIdPrefix = 'virtgroup|';
export const virtualInputIdPrefix = 'virt|';

export default inputs;