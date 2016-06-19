import _ from 'lodash';
import { panelControllers } from "./PanelControllers";

let inputs = [
  {
    id: '0',
    hwId: 0, 
    defaultPanelController: panelControllers.VCO_1_PITCH,
    defaultName: panelControllers.VCO_1_PITCH.defaultName
  },
  {
    id: '1',
    hwId: 1,    
    defaultPanelController: panelControllers.VCO_2_PITCH,
    defaultName: panelControllers.VCO_2_PITCH.defaultName
  },  
  {
    id: '2', 
    hwId: 2,    
    defaultPanelController: panelControllers.VCO_3_PITCH,
    defaultName: panelControllers.VCO_3_PITCH.defaultName
  },  
  {
    id: '3', 
    hwId: 3,    
    defaultPanelController: panelControllers.FILTER_1_CUTOFF,
    defaultName: panelControllers.FILTER_1_CUTOFF.defaultName
  },
  {
    id: '4', 
    hwId: 4,    
    defaultPanelController: panelControllers.FILTER_1_RESONANCE,
    defaultName: panelControllers.FILTER_1_RESONANCE.defaultName
  },
  {
    id: '5', 
    hwId: 5,    
    defaultPanelController: panelControllers.FILTER_1_SLOPE,
    defaultName: panelControllers.FILTER_1_SLOPE.defaultName
  },
  {
    id: '6', 
    hwId: 6,    
    defaultPanelController: panelControllers.FILTER_1_MODE,
    defaultName: panelControllers.FILTER_1_MODE.defaultName
  } 
];

let inputsById = {};

_.each(inputs, input => {
  inputsById[input.id] = input;
});

export {inputsById}; 

export default inputs;