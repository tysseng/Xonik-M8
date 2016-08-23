import React from 'react';
import { connect } from 'react-redux';
import { getInputGroups, getVirtualInputs, getPhysicalInputs, getControllerGroups } from '../../state/selectors';
import { selectControllerGroup } from '../../../shared/state/actions/controllers';

import ControlCenterColumn from './ControlCenterColumn';

const mapStateToProps = (state, ownProps) => {

  let groups = getInputGroups(state).get('groups');
  let inputs = getVirtualInputs(state).get('byId').toJS();
  _.merge(inputs, getPhysicalInputs(state).get('byId').toJS());
  let selectedGroupId = getControllerGroups(state).get('selectedGroupId');
  if(!selectedGroupId && selectedGroupId !== 0 && groups.size > 0) {
    selectedGroupId = groups.first().get('id');
  }

  return {
    inputs,
    inputValues: state.controllers.toJS(),    
    groups: groups.toJS(),
    selectedGroupId
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    selectGroup: groupId => dispatch(selectControllerGroup(groupId))
  }
}


const ControlCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ControlCenterColumn);

export default ControlCenterColumnContainer;