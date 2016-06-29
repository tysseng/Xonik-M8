import React from 'react';
import { connect } from 'react-redux'; 

import ControlCenterColumn from './ControlCenterColumn';

const mapStateToProps = (state, ownProps) => {
  return {
    inputs: state.inputs.get('byId').toJS(),
    groups: state.inputs.get('groups').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
  }
}


const ControlCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlCenterColumn);

export default ControlCenterColumnContainer;