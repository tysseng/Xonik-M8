import React from 'react';
import { connect } from 'react-redux';

import { updateField } from '../../../shared/state/actions/inputs';
import MidiForm from './MidiForm'

const mapStateToProps = (state, ownProps) => {

  return {
    id: ownProps.id,
    midi: ownProps.midi
  }
}

const parseIfNotEmpty = value => {
  if(value !== ''){
    return parseInt(value)
  }
  return value;
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onStatusChange: value => dispatch(updateField(ownProps.id, ['midi', 'status'], parseIfNotEmpty(value))),
    onData1Change: value => dispatch(updateField(ownProps.id, ['midi', 'data1'], parseIfNotEmpty(value))),
    onResolutionChange: value => dispatch(updateField(ownProps.id, ['midi', 'hires'], value)),
    onSendChange: value => dispatch(updateField(ownProps.id, ['midi', 'send'], value)),
    onReceiveChange: value => dispatch(updateField(ownProps.id, ['midi', 'receive'], value))
  }
}

const MidiFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MidiForm);

export default MidiFormContainer;
