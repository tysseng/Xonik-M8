let panelControllers = {
  VCO_1_PITCH: {
    id: '0',
    defaultName: "VCO 1 pitch",
    type: 'POT'
  },
  VCO_2_PITCH: {
    id: '1',
    defaultName: "VCO 2 pitch",
    type: 'POT'    
  },  
  VCO_3_PITCH: {
    id: '2', 
    defaultName: "VCO 3 pitch",
    type: 'POT'    
  },  
  FILTER_1_CUTOFF: {
    id: '3', 
    defaultName: "Filter 1 cut-off",
    type: 'POT'    
  },
  FILTER_1_RESONANCE: {
    id: '4', 
    defaultName: "Filter 1 resonance",
    type: 'POT'    
  },
  FILTER_1_SLOPE: {
    id: '5', 
    defaultName: "Filter 1 slope",
    type: 'SWITCH',
    options: [
      {id: '0', label: '12 dB'},
      {id: '1', label: '24 dB'}
    ]
  },
  FILTER_1_MODE: {
    id: '6', 
    defaultName: "Filter 1 mode",
    type: 'SWITCH',
    options: [
      {id: '0', label: 'HP'},
      {id: '1', label: 'BP'},
      {id: '1', label: 'LP'}
    ]
  } 
};

export { panelControllers };