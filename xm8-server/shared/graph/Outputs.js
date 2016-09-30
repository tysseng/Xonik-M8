import _ from 'lodash';

let outputsById = {
  VCO_1_PITCH: {
    hwId: 0,
    name: "VCO 1 pitch"
  },
  VCO_2_PITCH: {
    hwId: 1,
    name: "VCO 2 pitch"
  },
  VCO_3_PITCH: {
    hwId: 2,
    name: "VCO 3 pitch"
  },
  FILTER_1_CUTOFF: {
    hwId: 3,
    name: "Filter 1 cut-off"
  },
  FILTER_1_RESONANCE: {
    hwId: 4,
    name: "Filter 1 resonance"
  },
  FILTER_1_SLOPE: {
    hwId: 5,
    name: "Filter 1 slope" //12/24 dB
  },
  FILTER_1_MODE: {
    hwId: 6,
    name: "Filter 1 mode" //hp, bp, lp
  }
}

// add ids to each object
_.each(outputsById, (output, id) => {
  output.id = id;
});

// sorted list of outputs
let outputs = [
  outputsById.VCO_1_PITCH,
  outputsById.VCO_2_PITCH,
  outputsById.VCO_3_PITCH,
  outputsById.FILTER_1_CUTOFF,
  outputsById.FILTER_1_RESONANCE,
  outputsById.FILTER_1_SLOPE,
  outputsById.FILTER_1_MODE
];

export { outputsById };

export default outputs;