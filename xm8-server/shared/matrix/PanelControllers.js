let panelControllers = {
  VCO_1_PITCH: {
    id: '0',
    defaultName: "VCO 1 pitch",
    defaultShortName: 'pitch',
    type: 'POT'
  },
  VCO_2_PITCH: {
    id: '1',
    defaultName: "VCO 2 pitch",
    defaultShortName: 'pitch',
    type: 'POT'    
  },  
  VCO_3_PITCH: {
    id: '2', 
    defaultName: "VCO 3 pitch",
    defaultShortName: 'pitch',
    type: 'POT'    
  },  
  FILTER_1_CUTOFF: {
    id: '3', 
    defaultName: "Filter 1 cut-off",
    defaultShortName: 'cut-off',
    type: 'POT'    
  },
  FILTER_1_RESONANCE: {
    id: '4', 
    defaultName: "Filter 1 resonance",
    defaultShortName: 'resonance',
    type: 'POT'    
  },
  FILTER_1_SLOPE: {
    id: '5', 
    defaultName: "Filter 1 slope",
    defaultShortName: 'slope',
    type: 'SWITCH',
    options: [
      {id: '0', label: '12 dB'},
      {id: '1', label: '24 dB'}
    ]
  },
  FILTER_1_MODE: {
    id: '6', 
    defaultName: "Filter 1 mode",
    defaultShortName: 'mode',
    type: 'SWITCH',
    options: [
      {id: '0', label: 'HP'},
      {id: '1', label: 'BP'},
      {id: '1', label: 'LP'}
    ]
  } 
};

let controllerGroups = {
  VCO1: {
    name: 'VCO 1',
    controllers: [
      panelControllers.VCO_1_PITCH    
    ]
  },
  VCO2: {
    name: 'VCO 2',
    controllers: [
      panelControllers.VCO_2_PITCH   
    ]
  },
  VCO3: {
    name: 'VCO 3',
    controllers: [
      panelControllers.VCO_3_PITCH
    ]
  },
  VCF1: {
    name: 'VCF 1',
    controllers: [
      panelControllers.FILTER_1_CUTOFF,
      panelControllers.FILTER_1_RESONANCE,
      panelControllers.FILTER_1_SLOPE,
      panelControllers.FILTER_1_MODE
    ]
  }
}

export { panelControllers, controllerGroups };