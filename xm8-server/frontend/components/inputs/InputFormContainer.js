import React from 'react';
import { connect } from 'react-redux';

import { selectInput, rename, renameShort, updateField, deleteOption, newOption, spreadOptionValues, spreadOptionValuesMidi } from '../../../shared/state/actions/inputs';
import InputForm from './InputForm'

const mapStateToProps = (state, ownProps) => {

  let selectedInputId = state.inputs.get('selectedInput');
  let inputs = state.inputs.get('byId').toJS();
  let input = inputs[selectedInputId];

  let controllers = state.controllers.toJS()
  let inputValue = controllers[selectedInputId];

  return {
    input,
    inputValue
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseDialog: () => dispatch(selectInput('')),
    selectInput: (id) => dispatch(selectInput(id)),
    rename: (id, name) => dispatch(rename(id, name)),
    renameShort: (id, name) => dispatch(renameShort(id, name)),
    onScaleChange: (id, value) => dispatch(updateField(id, ['scale'], value)),
    onTypeChange: (id, value) => dispatch(updateField(id, ['type'], value)),
    onMinChange: (id, value) => dispatch(updateField(id, ['min'], value)), 
    onMaxChange:  (id, value) => dispatch(updateField(id, ['max'], value)),
    onStepGenerationModeChange:  (id, value) => dispatch(updateField(id, ['stepGenerationMode'], value)),
    onStepIntervalChange:  (id, value) => dispatch(updateField(id, ['stepInterval'], value)), 
    onNumberOfStepsChange:  (id, value) => dispatch(updateField(id, ['numberOfSteps'], value)),
    onControllerChange: (id, value) => dispatch(updateField(id, ['panelController'], value)),
    onStatusChange: (id, value) => dispatch(updateField(id, ['midi', 'status'], parseInt(value))),
    onData1Change: (id, value) => {
      value !== '' ? value = parseInt(value) : value;
      dispatch(updateField(id, ['midi', 'data1'], value));
    },
    onResolutionChange: (id, value) => dispatch(updateField(id, ['midi', 'hires'], value)),
    onSendChange: (id, value) => dispatch(updateField(id, ['midi', 'send'], value)),
    onReceiveChange: (id, value) => dispatch(updateField(id, ['midi', 'receive'], value)),
    onOptionLabelChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'label'], value)),
    onOptionValueMidiChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'valuemidi'], value)),
    onOptionValueChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'value'], value)),
    onOptionDelete: (id, index) => dispatch(deleteOption(id, index)),
    onOptionNew: (id) => dispatch(newOption(id)),
    onSpreadValues: (input) => dispatch(spreadOptionValues(input.id, false, false, input.min, input.max)),
    onSpreadValuesMidi: (id) => dispatch(spreadOptionValuesMidi(id, false, false))
  }
}

const InputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);

export default InputFormContainer;
