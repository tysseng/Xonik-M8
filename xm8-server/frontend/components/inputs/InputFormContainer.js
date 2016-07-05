import React from 'react';
import { connect } from 'react-redux';

import { selectInput, rename, renameShort, updateField, deleteOption, newOption, spreadOptionValues, spreadOptionValuesMidi } from '../../../shared/state/actions/inputs';
import InputForm from './InputForm'

const mapStateToProps = (state, ownProps) => {

  let inputs = state.inputs.get('byId').toJS();
  let selectedInputId = state.inputs.get('selectedInput');
  let input = inputs[selectedInputId];

  return {
    input
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onCloseDialog: () => {dispatch(selectInput(''))},
    rename: (id, name) => dispatch(rename(id, name)),
    renameShort: (id, name) => dispatch(renameShort(id, name)),
    onStatusChange: (id, value) => dispatch(updateField(id, ['midi', 'status'], parseInt(value))),
    onData1Change: (id, value) => dispatch(updateField(id, ['midi', 'data1'], parseInt(value))),
    onResolutionChange: (id, value) => dispatch(updateField(id, ['midi', 'hires'], value)),
    onSendChange: (id, value) => dispatch(updateField(id, ['midi', 'send'], value)),
    onReceiveChange: (id, value) => dispatch(updateField(id, ['midi', 'receive'], value)),
    onOptionLabelChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'label'], value)),
    onOptionValueMidiChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'valuemidi'], value)),
    onOptionValueChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'value'], value)),
    onOptionDelete: (id, index) => dispatch(deleteOption(id, index)),
    onOptionNew: (id) => dispatch(newOption(id)),
    onSpreadValues: (id) => dispatch(spreadOptionValues(id, false, false, false)),
    onSpreadValuesMidi: (id) => dispatch(spreadOptionValuesMidi(id, false, false, false))
  }
}

const InputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);

export default InputFormContainer;
