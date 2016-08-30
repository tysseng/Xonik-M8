import React from 'react';
import { connect } from 'react-redux'; 
import { selectElement, deselectElement, deselectDragElement, moveElement, inputgroupsUndoPointPositionChanged } from '../../../shared/state/actions/inputgroups.js'
import { getVirtualInputGroups, getVirtualInputs, getPhysicalInputs } from '../../state/selectors';

import InputGrid from './InputGrid';

const mapStateToProps = (state, ownProps) => {

  // TODO: Maybe selected group should be part of the undo buffer? This means mixing frontend and backend undo buffers though.
  let inputGroups = getVirtualInputGroups(state);

  let selectedGroupId = inputGroups.get('selectedGroup');
  let selectedGroup = inputGroups.getIn(['groups', selectedGroupId]);
  if(selectedGroup) selectedGroup = selectedGroup.toJS();

  let inputs = getVirtualInputs(state).get('byId').toJS();
  _.merge(inputs, getPhysicalInputs(state).get('byId').toJS());

  return {
    selectedGroup,
    inputs,
    dragElementId: inputGroups.get('dragElementId'),
    selectedElementId: inputGroups.get('selectedElementId'),
    dragStart: inputGroups.get('dragStart').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    selectElement: (id, mouseX, mouseY, offsetXem, offsetYem) => dispatch(selectElement(id, mouseX, mouseY, offsetXem, offsetYem)),
    moveElement: (groupId, id, x, y) => dispatch(moveElement(groupId, id, x, y)),
    deselectDragElement: () => {
      dispatch(deselectDragElement());
      dispatch(inputgroupsUndoPointPositionChanged());
    },
    deselectElement: () => {
      dispatch(deselectElement());
    }
  }
}


const InputGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGrid);

export default InputGridContainer;