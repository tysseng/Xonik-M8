import React from 'react';
import { connect } from 'react-redux'; 
import { selectElement, deselectDragElement, moveElement, inputgridUndoPointPositionChanged } from '../../../shared/state/actions/inputgrid.js'

import InputGrid from './InputGrid';

const mapStateToProps = (state, ownProps) => {

  // TODO: Maybe selected group should be part of the undo buffer? This means mixing frontend and backend undo buffers though.
  let selectedGroupId = state.inputgrid.get('selectedGroup');
  let selectedGroup = state.inputgrid.getIn(['groups', selectedGroupId]);
  if(selectedGroup) selectedGroup = selectedGroup.toJS();

  return {
    selectedGroup,
    inputs: state.inputs.get('byId').toJS(),
    dragElementId: state.inputgrid.get('dragElementId'),    
    dragStart: state.inputgrid.get('dragStart').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    selectElement: (id, mouseX, mouseY, offsetXem, offsetYem) => dispatch(selectElement(id, mouseX, mouseY, offsetXem, offsetYem)),
    moveElement: (groupId, id, x, y) => dispatch(moveElement(groupId, id, x, y)),
    deselectDragElement: () => {
      dispatch(deselectDragElement())
      dispatch(inputgridUndoPointPositionChanged());
    }
  }
}


const InputGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGrid);

export default InputGridContainer;