import React from 'react';
import { connect } from 'react-redux';
import GroupPropsForm from './GroupPropsForm';
import { renameGroup, toggleVisibility } from '../../../shared/state/actions/inputgroups';

const mapStateToProps = (state, ownProps) => {

  let inputgroups = state.inputgroups;
  let selectedGroupId = inputgroups.get('selectedGroup');
  let group = inputgroups.getIn(['groups', selectedGroupId]);
  if(group) group = group.toJS();

  return {
    group
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    renameGroup: (groupId, name) => dispatch(renameGroup(groupId, name)),
    toggleVisibility: (groupId, isVisible) => dispatch(toggleVisibility(groupId, isVisible))
  }
}

const GroupPropsFormContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupPropsForm);

export default GroupPropsFormContainer;
