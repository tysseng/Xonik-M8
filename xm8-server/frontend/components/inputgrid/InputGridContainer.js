import React from 'react';
import { connect } from 'react-redux'; 
import {selectElement, deselectDragElement, moveElement} from '../../../shared/state/actions/inputgrid.js'

import InputGrid from './InputGrid';

const mapStateToProps = (state, ownProps) => {

  let selectedGroupId = state.inputgrid.get('selectedGroup');
  let selectedGroup = selectedGroupId !== '' ? state.inputgrid.getIn(['groups', selectedGroupId]).toJS() : undefined;
  let inputs = state.inputs.get('byId').toJS();

  return {
    dragElementId: state.inputgrid.get('dragElementId'),
    selectedGroup,
    inputs,
    dragStart: state.inputgrid.get('dragStart').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    selectElement: (id, mouseX, mouseY, offsetXem, offsetYem) => dispatch(selectElement(id, mouseX, mouseY, offsetXem, offsetYem)),
    moveElement: (groupId, id, x, y) => dispatch(moveElement(groupId, id, x, y)),
    deselectDragElement: () => dispatch(deselectDragElement())
  }
}


const InputGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGrid);

export default InputGridContainer;