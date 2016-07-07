import React from 'react';
import Fader from './Fader';
import { connect } from 'react-redux'; 
import { changeValue } from '../../../shared/state/actions/inputs';

const mapStateToProps = (state, ownProps) => {

  let {type, value, name, min, max, step} = ownProps.input;

  // get default value if value is not yet in state. should probably be moved to state initialisation
  if(ownProps.value !== undefined){
    value = ownProps.value;
  }

  return {
    value,
    label: name.short,
    min,
    max, 
    step,
    orientation: type === 'VERTICAL_RANGE' ? 'vertical' : 'horizontal'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => dispatch(changeValue(ownProps.input.id, e.target.value))
  }
}


const InputFader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fader);

export default InputFader;