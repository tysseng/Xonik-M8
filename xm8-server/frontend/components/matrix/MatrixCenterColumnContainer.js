import React from 'react';
import { connect } from 'react-redux'; 
import { toggleDirectOutput, toggleHover} from '../../../shared/state/actions/matrix';

import MatrixCenterColumn from './MatrixCenterColumn';

const mapStateToProps = (state, ownProps) => {
  let inputs = state.inputs.get('byId').toJS();
  let directoutputs = state.matrix.get('directoutputs').toJS();

  return {
    inputs,
    directoutputs
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    toggleButton: (inputId, outputId) => dispatch(toggleDirectOutput(inputId, outputId)),
    hover: (inputId, outputId) => dispatch(toggleHover(inputId, outputId))
  }
}


const MatrixCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixCenterColumn);

export default MatrixCenterColumnContainer;