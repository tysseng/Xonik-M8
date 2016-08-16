import React from 'react';
import { connect } from 'react-redux';

import { selectInput, rename, renameShort, updateField } from '../../../../shared/state/actions/inputs';
import PhysicalInputForm from './PhysicalInputForm'

const mapStateToProps = (state, ownProps) => {

  console.log(state)

  let selectedInputId = state.physicalInputs.getIn(['frontend', 'selectedInput']);
  let inputs = state.physicalInputs.get('byId').toJS();
  let input = inputs[selectedInputId];

  let controllers = state.controllers.toJS()
  let inputValue = controllers[selectedInputId];

  return {
    input,
    inputValue,
    showFileDialog: state.filedialog.get('show')
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
