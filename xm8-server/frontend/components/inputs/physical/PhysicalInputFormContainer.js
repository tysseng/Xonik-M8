import React from 'react';
import { connect } from 'react-redux';

import { rename, renameShort, updateField } from '../../../../shared/state/actions/inputs';
import { selectInput } from '../../../../shared/state/actions/gui/guiinputs';
import { getPhysicalInputs, getGuiPhysicalInputs, getControllers } from '../../../state/selectors';

import PhysicalInputForm from './PhysicalInputForm'

const mapStateToProps = (state, ownProps) => {

  let guiPhysicalInputs = getGuiPhysicalInputs(state);
  let selectedInputId = guiPhysicalInputs.getIn(['frontend', 'selectedInput']);

  let physicalInputs = getPhysicalInputs(state);
  let inputs = physicalInputs.get('byId').toJS();
  let input = inputs[selectedInputId];

  let controllers = getControllers(state).toJS();
  let inputValue = controllers[selectedInputId];

  return {
    input,
    inputValue
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseDialog: () => dispatch(selectInput('')),
    selectInput: (id) => dispatch(selectInput('physical', id)),
    rename: (id, name) => dispatch(rename(id, name)),
    renameShort: (id, name) => dispatch(renameShort(id, name)),
    onScaleChange: (id, value) => dispatch(updateField(id, ['scale'], value)),
    onTypeChange: (id, value) => dispatch(updateField(id, ['type'], value)),
    onMinChange: (id, value) => dispatch(updateField(id, ['min'], value)), 
    onMaxChange:  (id, value) => dispatch(updateField(id, ['max'], value)),
    onStepGenerationModeChange:  (id, value) => dispatch(updateField(id, ['stepGenerationMode'], value)),
    onStepIntervalChange:  (id, value) => dispatch(updateField(id, ['stepInterval'], value)), 
    onNumberOfStepsChange:  (id, value) => dispatch(updateField(id, ['numberOfSteps'], value))
  }
}

const PhysicalInputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(PhysicalInputForm);

export default PhysicalInputFormContainer;
