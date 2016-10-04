import store from '../../../../core/state/store';
import { resetPhysicalInputs, newInput, rename, renameShort, updateField, updatePanelController } from '../../../../shared/state/actions/inputs';
import { resetPatch } from '../../../../shared/state/actions/patch';
import { getPhysicalInputs, getVirtualInputs, getVirtualInput } from '../../../../core/state/selectors';
import { panelControllersById} from '../../../../shared/graph/PanelControllers';

let currentVirtualInputId = 0;
let voiceGroupId = '0';

export const init = () => {
  store.dispatch(resetPhysicalInputs(voiceGroupId));
  store.dispatch(resetPatch(voiceGroupId));
  currentVirtualInputId = 0;
}

const getNextVirtualInputId = () => {
  let newVirtualInputId = currentVirtualInputId;
  currentVirtualInputId++;
  return 'virt|' + newVirtualInputId;
}

export const createVirtualInput = () => {
  let id = getNextVirtualInputId();
  store.dispatch(newInput(id, panelControllersById.PC_VIRTUAL.id, voiceGroupId));
  return getVirtualInput(voiceGroupId, id).toJS();
}

export const name = (input, newName) => {
  store.dispatch(rename(input.id, newName, voiceGroupId));
}

export const shortName = (input, newName) => {
  store.dispatch(renameShort(input.id, newName, voiceGroupId));
}

export const panelController = (input, panelController) => {
  store.dispatch(updatePanelController(input.id, panelController, voiceGroupId));
}

export const midiStatus = (input, status) => {
  store.dispatch(updateField(input.id, ['midi', 'status'], status, voiceGroupId));
}

export const midiData1 = (input, data1) => {
  store.dispatch(updateField(input.id, ['midi', 'data1'], data1, voiceGroupId));
}

export const midiHires = (input, isHires) => {
  store.dispatch(updateField(input.id, ['midi', 'hires'], isHires, voiceGroupId));
}

export const midiSend = (input, shouldSend) => {
  store.dispatch(updateField(input.id, ['midi', 'send'], shouldSend, voiceGroupId));
}

export const midiReceive = (input, shouldReceive) => {
  store.dispatch(updateField(input.id, ['midi', 'receive'], shouldReceive, voiceGroupId));
}

export const stepGenerationMode = (input, mode) => {
  store.dispatch(updateField(input.id, ['stepGenerationMode'], mode, voiceGroupId));
}

export const option = (input, index, value, valueMidi, label) => {
  store.dispatch(updateField(input.id, ['stepGenerationMode'], 'OPTIONS', voiceGroupId));
  if(label) store.dispatch(updateField(input.id, ['options', index, 'label'], value, voiceGroupId));
  if(valueMidi) store.dispatch(updateField(input.id, ['options', index, 'valuemidi'], value, voiceGroupId));
  if(value) store.dispatch(updateField(input.id, ['options', index, 'value'], value, voiceGroupId));
}

export const getMutableVirtualInputs = () => {
  return getVirtualInputs(voiceGroupId).toJS();
}

export const getMutablePhysicalInputs = () => {
  return getPhysicalInputs(voiceGroupId).toJS().byId;
}