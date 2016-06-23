import React from 'react';
import { connect } from 'react-redux';
import MatrixMain from './MatrixMain';

// TODO: Don't update if net does not validate (or send error message)

const mapStateToProps = (state, ownProps) => {
  return {
    
  }
}

const MatrixMainContainer = connect(
  mapStateToProps,
  null
)(MatrixMain);

export default MatrixMainContainer;
