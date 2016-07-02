// TODO: Controllers should have default send/receive midi messages (?)
// TODO: Send panel cc should be toggleable.

let panelControllers = {
  OSC_1_PITCH: {
    id: '0',
    name: {
      full: "Osc 1 pitch",
      short: 'pitch'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}

  },
  OSC_1_SQUARE: {
    id: '0',
    name: {
      full: "Osc 1 square",
      short: 'square'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  OSC_1_SAW: {
    id: '0',
    name: {
      full: "Osc 1 saw",
      short: 'saw'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  OSC_1_TRIANGLE: {
    id: '0',
    name: {
      full: "Osc 1 triangle",
      short: 'triangle'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },    
  OSC_2_PITCH: {
    id: '1',
    name: {
      full: "Osc 1 pitch",
      short: 'pitch'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}  
  },  
  OSC_3_PITCH: {
    id: '2', 
    name: {
      full: "Osc 1 pitch",
      short: 'pitch'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}  
  },  
  FILTER_1_CUTOFF: {
    id: '3', 
    name: {
      full: "Filter 1 cut-off",
      short: 'cut-off'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  FILTER_1_RESONANCE: {
    id: '4', 
    name: {
      full: "Filter 1 resonance",
      short: 'resonance'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  FILTER_1_SLOPE: {
    id: '5', 
    name: {
      full: "Filter 1 slope",
      short: 'slope'
    },    
    type: 'SWITCH',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}},
    options: [
      {id: '0', label: '12 dB'},
      {id: '1', label: '24 dB'}
    ]
  },
  FILTER_1_MODE: {
    id: '6', 
    name: {
      full: "Filter 1 mode",
      short: 'mode'
    },       
    type: 'SWITCH',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}},
    options: [
      {id: '0', label: 'HP'},
      {id: '1', label: 'BP'},
      {id: '1', label: 'LP'}
    ]
  },
  AMP_ENV_ATTACK: {
    id: '4', 
    name: {
      full: "Amp attack",
      short: 'attack'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}   
  },
  AMP_ENV_DECAY: {
    id: '4', 
    name: {
      full: "Amp decay",
      short: 'decay'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  AMP_ENV_SUSTAIN: {
    id: '4', 
    name: {
      full: "Amp sustain",
      short: 'sustain'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  AMP_ENV_RELEASE: {
    id: '4', 
    name: {
      full: "Amp release",
      short: 'release'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  FILTER_1_ENV_ATTACK: {
    id: '4', 
    name: {
      full: "Filter 1 attack",
      short: 'attack'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  FILTER_1_ENV_DECAY: {
    id: '4', 
    name: {
      full: "Filter 1 decay",
      short: 'decay'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  FILTER_1_ENV_SUSTAIN: {
    id: '4', 
    name: {
      full: "Filter 1 sustain",
      short: 'sustain'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  },
  FILTER_1_ENV_RELEASE: {
    id: '4', 
    name: {
      full: "Filter 1 release",
      short: 'release'
    },
    type: 'POT',
    midi: {transmit: {status: 0xB0}, receive: {status: 0xB0}}
  }  
};

export { panelControllers };