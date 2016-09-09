import { inputGroupsById as physicalInputGroups } from '../../../shared/graph/Inputs';
import { getVirtualInputGroups, getGuiControllers } from '../../state/selectors';

export const getSelectedGroupId = (state, inputs) => {
  let groups = getGroups(state);
  let selectedGroupId = getGuiControllers(state).get('selectedGroupId');
  if (!selectedGroupId && selectedGroupId !== 0 && Object.values(inputs).length > 0) {
    let groupsAsArray = Object.values(groups);
    selectedGroupId = groupsAsArray[0].id;
  }
  return selectedGroupId;
}

export const getGroups = (state) => {
  let groups = physicalInputGroups;
  _.merge(groups, getVirtualInputGroups(state).get('groups').toJS());
  return groups;
}