import React from 'react';
import { connect } from 'react-redux';

import { selectInput, rename, renameShort } from '../../../shared/state/actions/inputs';
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
    onCloseDialog: () => {console.log('closing'); dispatch(selectInput(''))},
    rename: (id, name) => dispatch(rename(id, name)),
    renameShort: (id, name) => dispatch(renameShort(id, name))
  }
}

const InputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);

export default InputFormContainer;
