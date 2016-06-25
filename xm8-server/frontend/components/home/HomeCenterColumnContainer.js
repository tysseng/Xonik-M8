import React from 'react';
import { connect } from 'react-redux'; 

import HomeCenterColumn from './HomeCenterColumn';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
  }
}


const HomeCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeCenterColumn);

export default HomeCenterColumnContainer;