import React from 'react';
import { connect } from 'react-redux'; 
import { toggleDirectOutput, toggleHover} from '../../../shared/state/actions/matrix';

import MatrixCenterColumn from './MatrixCenterColumn';

const mapStateToProps = (state, ownProps) => {
  let inputs = state.inputs.get('byId').toJS();
  let directoutputs = state.matrix.get('directoutputs').toJS();
  let hover = state.matrix.get('hover').toJS();
  let graphOutputs = state.nodes.get('outputs').toJS();
  inputs = _.sortBy(inputs, ['sortKey']);
  
  return {
    inputs,
    directoutputs,
    hover,
    graphOutputs
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    toggleButton: (inputId, outputId) => dispatch(toggleDirectOutput(inputId, outputId)),
    onHover: (inputId, outputId) => dispatch(toggleHover(inputId, outputId))
  }
}


const MatrixCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixCenterColumn);

export default MatrixCenterColumnContainer;