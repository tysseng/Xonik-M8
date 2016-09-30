// TODO: Controllers should have default send/receive midi messages (?)
// TODO: Send panel cc should be toggleable.
import _ from 'lodash';

let panelControllersById = {
  VIRTUAL: {
    name: {
      full: "None (virtual)",
      short: 'virtual'
    },
    type: 'VIRTUAL',
    midi: {status: '', data1: ''}

  },
  OSC_1_PITCH: {
    name: {
      full: "Osc 1 pitch",
      short: 'pitch'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}

  },
  OSC_1_SQUARE: {
    name: {
      full: "Osc 1 square",
      short: 'square'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  OSC_1_SAW: {
    name: {
      full: "Osc 1 saw",
      short: 'saw'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  OSC_1_TRIANGLE: {
    name: {
      full: "Osc 1 triangle",
      short: 'triangle'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  OSC_2_PITCH: {
    name: {
      full: "Osc 1 pitch",
      short: 'pitch'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  OSC_3_PITCH: {
    name: {
      full: "Osc 1 pitch",
      short: 'pitch'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  FILTER_1_CUTOFF: {
    name: {
      full: "Filter 1 cut-off",
      short: 'cut-off'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  FILTER_1_RESONANCE: {
    name: {
      full: "Filter 1 resonance",
      short: 'resonance'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  FILTER_1_SLOPE: {
    name: {
      full: "Filter 1 slope",
      short: 'slope'
    },
    type: 'SWITCH',
    midi: {status: 0xB0, data1: ''},
    options: [
      {id: '0', label: '12 dB'},
      {id: '1', label: '24 dB'}
    ]
  },
  FILTER_1_MODE: {
    name: {
      full: "Filter 1 mode",
      short: 'mode'
    },
    type: 'SWITCH',
    midi: {status: 0xB0, data1: ''},
    options: [
      {id: '0', label: 'HP'},
      {id: '1', label: 'BP'},
      {id: '2', label: 'LP'}
    ]
  },
  AMP_ENV_ATTACK: {
    name: {
      full: "Amp attack",
      short: 'attack'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  AMP_ENV_DECAY: {
    name: {
      full: "Amp decay",
      short: 'decay'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  AMP_ENV_SUSTAIN: {
    name: {
      full: "Amp sustain",
      short: 'sustain'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  AMP_ENV_RELEASE: {
    name: {
      full: "Amp release",
      short: 'release'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  FILTER_1_ENV_ATTACK: {
    name: {
      full: "Filter 1 attack",
      short: 'attack'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  FILTER_1_ENV_DECAY: {
    name: {
      full: "Filter 1 decay",
      short: 'decay'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  FILTER_1_ENV_SUSTAIN: {
    name: {
      full: "Filter 1 sustain",
      short: 'sustain'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  },
  FILTER_1_ENV_RELEASE: {
    name: {
      full: "Filter 1 release",
      short: 'release'
    },
    type: 'POT',
    midi: {status: 0xB0, data1: ''}
  }
}

// Add id to controllers and add to a list.
let panelControllers = [];
_.each(panelControllersById, (panelController, id) => {
  panelController.id = id;
  panelControllers.push(panelController);
});

export { panelControllers, panelControllersById };