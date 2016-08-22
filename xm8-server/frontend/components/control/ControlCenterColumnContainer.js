import React from 'react';
import { connect } from 'react-redux';
import { getInputGroups, getVirtualInputs, getPhysicalInputs } from '../../state/selectors';

import ControlCenterColumn from './ControlCenterColumn';

const mapStateToProps = (state, ownProps) => {

  let groups = getInputGroups(state).get('groups').toJS();
  let inputs = getVirtualInputs(state).get('byId').toJS();
  _.merge(inputs, getPhysicalInputs(state).get('byId').toJS());

  return {
    inputs,
    inputValues: state.controllers.toJS(),    
    groups
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