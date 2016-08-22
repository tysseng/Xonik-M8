import React from 'react';
import { connect } from 'react-redux'; 
import { closeNewElementDialog, addElement, selectInputInNewElementDialog, selectGroup, renameGroup, toggleVisibility } from '../../../shared/state/actions/inputgroups';

import InputGroupsCenterColumn from './InputGroupsCenterColumn';

const mapStateToProps = (state, ownProps) => {

  let inputgroups = state.inputgroups;
  let selectedGroupId = inputgroups.get('selectedGroup');

  return {
    selectedGroupId,
    showFileDialog: state.filedialog.get('show'),
    newElementDialog: inputgroups.get('newElementDialog').toJS(),
    groupName: inputgroups.getIn(['groups', selectedGroupId, 'name']),
    isVisible: inputgroups.getIn(['groups', selectedGroupId, 'isVisible'])
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {  
    closeNewElementDialog: () => dispatch(closeNewElementDialog()), 
    addElement: (groupId, type, id) => dispatch(addElement(id, groupId, id, type, 0, 0)), 
    selectElement: (type, id) => dispatch(selectInputInNewElementDialog(type, id)),
    selectGroup: groupId => dispatch(selectGroup(groupId)),
    renameGroup: (groupId, name) => dispatch(renameGroup(groupId, name)),
    toggleVisibility: (groupId, isVisible) => dispatch(toggleVisibility(groupId, isVisible))
  }
}


const InputGroupsCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGroupsCenterColumn);

export default InputGroupsCenterColumnContainer;