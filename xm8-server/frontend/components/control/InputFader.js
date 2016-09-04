import React from 'react';
import Fader from './Fader';
import { connect } from 'react-redux'; 
import { changeValue } from '../../../shared/state/actions/inputs';
import { inputTypesById as inputTypes } from "../../../shared/inputs/InputTypes";

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
    orientation: type === inputTypes.VERTICAL_RANGE.id ? 'vertical' : 'horizontal'
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange: (e) => {
      if(!ownProps.readOnly) dispatch(changeValue(ownProps.input.id, e.target.value));
    }
  }
}


const InputFader = connect(
  mapStateToProps,
  mapDispatchToProps
)(Fader);

export default InputFader;