import { panelControllers } from "./PanelControllers";

let inputs = [
  {
    id: '0',
    hwId: 0, 
    defaultPanelController: panelControllers.VCO_1_PITCH
  },
  {
    id: '1',
    hwId: 1,    
    defaultPanelController: panelControllers.VCO_2_PITCH
  },  
  {
    id: '2', 
    hwId: 2,    
    defaultPanelController: panelControllers.VCO_3_PITCH
  },  
  {
    id: '3', 
    hwId: 3,    
    defaultPanelController: panelControllers.FILTER_1_CUTOFF
  },
  {
    id: '4', 
    hwId: 4,    
    defaultPanelController: panelControllers.FILTER_1_RESONANCE
  },
  {
    id: '5', 
    hwId: 5,    
    defaultPanelController: panelControllers.FILTER_1_SLOPE
  },
  {
    id: '6', 
    hwId: 6,    
    defaultPanelController: panelControllers.FILTER_1_MODE
  } 
];

export default inputs;