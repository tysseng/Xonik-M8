import React from 'react';
import { connect } from 'react-redux'; 
import { toggleDirectOutput} from '../../../shared/state/actions/matrix';
import { toggleHover} from '../../../shared/state/actions/gui/guimatrix';
import { getPhysicalInputs, getMatrix, getGuiMatrix, getGraph } from '../../state/selectors';

import MatrixCenterColumn from './MatrixCenterColumn';

const mapStateToProps = (state, ownProps) => {
  let matrix = getMatrix(state);
  let inputs = getPhysicalInputs(state).get('byId').toJS();
  let directoutputs = matrix.get('directoutputs').toJS();
  let hover = getGuiMatrix(state).get('hover').toJS();
  let graphOutputs = getGraph(state).get('outputs').toJS();
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