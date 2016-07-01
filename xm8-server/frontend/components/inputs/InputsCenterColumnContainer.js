import React from 'react';
import { connect } from 'react-redux'; 

import InputsCenterColumn from './InputsCenterColumn';
import {selectInput} from '../../../shared/state/actions/inputs'

const mapStateToProps = (state, ownProps) => { 

  let orderedInputs = _.sortBy(state.inputs.get('byId').toJS(), ['sortKey']);

  return {
    inputs: orderedInputs,
    groups: state.inputs.get('groups').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    selectInput: (id) => dispatch(selectInput(id))
  }
}


const InputsCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputsCenterColumn);

export default InputsCenterColumnContainer;