import React from 'react';
import { connect } from 'react-redux';

import { selectInput, rename, renameShort, updateField } from '../../../../shared/state/actions/inputs';
import VirtualInputForm from './VirtualInputForm'
import { getVirtualInputs, getControllers } from '../../../state/selectors';

const mapStateToProps = (state, ownProps) => {

  let virtualInputs = getVirtualInputs(state);
  let selectedInputId = virtualInputs.getIn(['frontend', 'selectedInput']);

  let inputs = virtualInputs.get('byId').toJS();
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
    selectInput: (id) => {
      dispatch(selectInput('virtual', id))
    },
    rename: (id, name) => dispatch(rename(id, name)),
    renameShort: (id, name) => dispatch(renameShort(id, name)),
    onScaleChange: (id, value) => dispatch(updateField(id, ['scale'], value)),
    onTypeChange: (id, value) => dispatch(updateField(id, ['type'], value)),
    onMinChange: (id, value) => dispatch(updateField(id, ['min'], value)), 
    onMaxChange:  (id, value) => dispatch(updateField(id, ['max'], value)),
    onStepGenerationModeChange:  (id, value) => dispatch(updateField(id, ['stepGenerationMode'], value)),
    onStepIntervalChange:  (id, value) => dispatch(updateField(id, ['stepInterval'], value)), 
    onNumberOfStepsChange:  (id, value) => dispatch(updateField(id, ['numberOfSteps'], value)),
    onControllerChange: (id, value) => dispatch(updateField(id, ['panelController'], value))
  }
}

const VirtualInputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(VirtualInputForm);

export default VirtualInputFormContainer;
