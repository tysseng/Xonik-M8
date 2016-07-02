import React from 'react';
import { connect } from 'react-redux';

import { selectInput, rename, renameShort, 
  updateMidiReceiveStatus, updateMidiTransmitStatus, 
  updateMidiReceiveData1, updateMidiTransmitData1,
  updateMidiReceiveResolution, updateMidiTransmitResolution } from '../../../shared/state/actions/inputs';
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
    renameShort: (id, name) => dispatch(renameShort(id, name)),
    onReceiveStatusChange: (id, value) => dispatch(updateMidiReceiveStatus(id, value)),
    onTransmitStatusChange: (id, value) => dispatch(updateMidiTransmitStatus(id, value)),
    onReceiveData1Change: (id, value) => dispatch(updateMidiReceiveData1(id, value)),
    onTransmitData1Change: (id, value) => dispatch(updateMidiTransmitData1(id, value)),
    onReceiveResolutionChange: (id, value) => dispatch(updateMidiReceiveResolution(id, value)),
    onTransmitResolutionChange: (id, value) => dispatch(updateMidiTransmitResolution(id, value))
  }
}

const InputFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputForm);

export default InputFormContainer;
