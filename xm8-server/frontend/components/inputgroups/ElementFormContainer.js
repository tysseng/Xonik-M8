import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { changeElementType, deselectElement } from '../../../shared/state/actions/inputgroups';
import ElementForm from './ElementForm'

const getSelectedElement = (state) => {
  let selectedGroupId = state.inputgroups.get('selectedGroup');
  let selectedGroup = selectedGroupId !== '' ? state.inputgroups.getIn(['groups', selectedGroupId]) : undefined;  

  if(selectedGroup){
    let selectedElementId = state.inputgroups.get('selectedElementId');
    let selectedElement = selectedGroup.getIn(['elements', selectedElementId]);
    if(selectedElement) {       
      return selectedElement.toJS();
    }
  }
  return undefined;
}

const mapStateToProps = (state, ownProps) => {

  let element = getSelectedElement(state);
  let inputs = state.virtualInputs.get('byId').toJS();
  _.merge(inputs, state.physicalInputs.get('byId').toJS());

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
