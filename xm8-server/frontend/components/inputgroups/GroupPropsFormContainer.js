import React from 'react';
import { connect } from 'react-redux';
import GroupPropsForm from './GroupPropsForm';
import { renameGroup, toggleVisibility } from '../../../shared/state/actions/inputgroups';
import { getVirtualInputGroups, getGuiVirtualInputGroups } from '../../state/selectors';

const mapStateToProps = (state, ownProps) => {

  let inputgroups = getVirtualInputGroups(state);
  let guiinputgroups = getGuiVirtualInputGroups(state);
  let selectedGroupId = guiinputgroups.get('selectedGroup');
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
