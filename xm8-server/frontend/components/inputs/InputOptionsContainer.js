import React from 'react';
import { connect } from 'react-redux';

import { updateField, deleteOption, newOption, spreadOptionValues, spreadOptionValuesMidi } from '../../../shared/state/actions/inputs';
import InputOptions from './InputOptions'

const mapStateToProps = (state, ownProps) => {

  return {
    input: ownProps.input
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onLabelChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'label'], value)),
    onValueMidiChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'valuemidi'], value)),
    onValueChange: (id, index, value) => dispatch(updateField(id, ['options', index, 'value'], value)),
    onDelete: (id, index) => dispatch(deleteOption(id, index)),
    onNew: (id) => dispatch(newOption(id)),
    onSpreadValues: (input) => dispatch(spreadOptionValues(input.id, false, false, input.min, input.max)),
    onSpreadValuesMidi: (id) => dispatch(spreadOptionValuesMidi(id, false, false))
  }
}

const InputOptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputOptions);

export default InputOptionsContainer;
