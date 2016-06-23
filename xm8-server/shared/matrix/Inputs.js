import _ from 'lodash';
import { panelControllers } from "./PanelControllers";

const getInput = (id, hwId, controller) => {
  return {
    id,
    hwId,
    defaultPanelController: controller,
    defaultName: controller.defaultName,
    defaultShortName: controller.defaultShortName
  }
}

let inputs = [
  getInput('0',0, panelControllers.VCO_1_PITCH),
  getInput('1',2, panelControllers.VCO_2_PITCH),
  getInput('2',2, panelControllers.VCO_3_PITCH),
  getInput('3',3, panelControllers.FILTER_1_CUTOFF),
  getInput('4',4, panelControllers.FILTER_1_RESONANCE),
  getInput('5',5, panelControllers.FILTER_1_SLOPE),
  getInput('6',6, panelControllers.FILTER_1_MODE)
];

let inputsById = {};
_.each(inputs, input => {
  inputsById[input.id] = input;
});

export {inputsById}; 

export default inputs;