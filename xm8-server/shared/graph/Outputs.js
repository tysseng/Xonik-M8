import _ from 'lodash';

let outputsById = {
  OUT_VCO_1_PITCH: {
    hwId: 0,
    name: "VCO 1 pitch"
  },
  OUT_VCO_2_PITCH: {
    hwId: 1,
    name: "VCO 2 pitch"
  },
  OUT_VCO_3_PITCH: {
    hwId: 2,
    name: "VCO 3 pitch"
  },
  OUT_FILTER_1_CUTOFF: {
    hwId: 3,
    name: "Filter 1 cut-off"
  },
  OUT_FILTER_1_RESONANCE: {
    hwId: 4,
    name: "Filter 1 resonance"
  },
  OUT_FILTER_1_SLOPE: {
    hwId: 5,
    name: "Filter 1 slope" //12/24 dB
  },
  OUT_FILTER_1_MODE: {
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
  outputsById.OUT_VCO_1_PITCH,
  outputsById.OUT_VCO_2_PITCH,
  outputsById.OUT_VCO_3_PITCH,
  outputsById.OUT_FILTER_1_CUTOFF,
  outputsById.OUT_FILTER_1_RESONANCE,
  outputsById.OUT_FILTER_1_SLOPE,
  outputsById.OUT_FILTER_1_MODE
];

export { outputsById };

export default outputs;