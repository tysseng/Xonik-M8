import React from 'react';
import { connect } from 'react-redux'; 

import TrashCenterColumn from './TrashCenterColumn';

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
  }
}


const TrashCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TrashCenterColumn);

export default TrashCenterColumnContainer;