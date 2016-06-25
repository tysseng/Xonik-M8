import React from 'react';
import { connect } from 'react-redux'; 

import NetworkCenterColumn from './NetworkCenterColumn';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
  }
}


const NetworkCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(NetworkCenterColumn);

export default NetworkCenterColumnContainer;