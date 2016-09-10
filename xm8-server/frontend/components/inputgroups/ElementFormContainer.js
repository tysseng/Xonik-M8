import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { changeElementType } from '../../../shared/state/actions/inputgroups';
import { deselectElement } from '../../../shared/state/actions/gui/guiinputgroups';
import { getGuiVirtualInputGroups, getVirtualInputGroups, getVirtualInputs, getPhysicalInputs } from '../../state/selectors';
import ElementForm from './ElementForm'

const getSelectedElement = (state) => {
  let inputgroups = getVirtualInputGroups(state);
  let guiinputgroups = getGuiVirtualInputGroups(state);
  let selectedGroupId = guiinputgroups.get('selectedGroup');
  let selectedGroup = selectedGroupId !== '' ? inputgroups.getIn(['groups', selectedGroupId]) : undefined;

  if(selectedGroup){
    let selectedElementId = guiinputgroups.get('selectedElementId');
    let selectedElement = selectedGroup.getIn(['elements', selectedElementId]);
    if(selectedElement) {       
      return selectedElement.toJS();
    }
  }
  return undefined;
}

const mapStateToProps = (state, ownProps) => {

  let element = getSelectedElement(state);
  let inputs = getVirtualInputs(state).get('byId').toJS();
  _.merge(inputs, getPhysicalInputs(state).get('byId').toJS());

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
