import React from 'react';
import { connect } from 'react-redux'; 
import { toggleDirectOutput} from '../../../shared/state/actions/inputs';

import MatrixCenterColumn from './MatrixCenterColumn';

const mapStateToProps = (state, ownProps) => {
  let inputs = state.inputs.get('byId').toJS();

  return {
    inputs
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    toggleButton: (inputId, outputId) => dispatch(toggleDirectOutput(inputId, outputId))
  }
}


const MatrixCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MatrixCenterColumn);

export default MatrixCenterColumnContainer;