import store from '../../../../core/state/store';
import { resetPhysicalInputs, newInput, rename, renameShort, updateField } from '../../../../shared/state/actions/inputs';
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
  store.dispatch(newInput(id, panelControllersById.VIRTUAL.id, voiceGroupId));
  return getVirtualInput(voiceGroupId, id).toJS();
}

export const name = (input, newName) => {
  store.dispatch(rename(input.id, newName, voiceGroupId));
  return getVirtualInput(voiceGroupId, input.id).toJS();
}

export const shortName = (input, newName) => {
  store.dispatch(renameShort(input.id, newName, voiceGroupId));
  return getVirtualInput(voiceGroupId, input.id).toJS();
}

export const panelController = (input, panelController) => {
  store.dispatch(updateField(input.id, ['panelController'], panelController, voiceGroupId));
  return getVirtualInput(voiceGroupId, input.id).toJS();
}

export const getMutableVirtualInputs = () => {
  return getVirtualInputs(voiceGroupId).toJS();
}

export const getMutablePhysicalInputs = () => {
  return getPhysicalInputs(voiceGroupId).toJS().byId;
}