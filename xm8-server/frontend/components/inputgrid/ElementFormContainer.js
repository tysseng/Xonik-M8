import React from 'react';
import { connect } from 'react-redux';

import { changeElementType, deselectElement } from '../../../shared/state/actions/inputgrid';
import ElementForm from './ElementForm'

const getSelectedElement = (state) => {
  let selectedGroupId = state.inputgrid.get('selectedGroup');
  let selectedGroup = selectedGroupId !== '' ? state.inputgrid.getIn(['groups', selectedGroupId]) : undefined;  

  if(selectedGroup){
    let selectedElementId = state.inputgrid.get('selectedElementId');
    let selectedElement = selectedGroup.getIn(['elements', selectedElementId]);
    if(selectedElement) {       
      return selectedElement.toJS();
    }
  }
  return undefined;
}

const mapStateToProps = (state, ownProps) => {

  let element = getSelectedElement(state);
  let inputs = state.inputs.get('byId').toJS();
  let input;
  if(element){
    input = inputs[element.elementId];
  }
  return {
    element,
    input
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeElementType: (groupId, elementId, value) => dispatch(changeElementType(groupId, elementId, value)),
    onCloseDialog: () => dispatch(deselectElement())
  }
}

const ElementFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ElementForm);

export default ElementFormContainer;
