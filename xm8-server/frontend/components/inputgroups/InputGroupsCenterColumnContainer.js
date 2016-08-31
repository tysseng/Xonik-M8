import React from 'react';
import { connect } from 'react-redux'; 
import { closeNewElementDialog, addElement, selectInputInNewElementDialog, selectGroup } from '../../../shared/state/actions/inputgroups';
import { getFileDialog, getVirtualInputGroups } from '../../state/selectors';
import InputGroupsCenterColumn from './InputGroupsCenterColumn';

const mapStateToProps = (state, ownProps) => {

  let inputgroups = getVirtualInputGroups(state);
  let selectedGroupId = inputgroups.get('selectedGroup');

  return {
    selectedGroupId,
    showFileDialog: getFileDialog(state).get('show'),
    newElementDialog: inputgroups.get('newElementDialog').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {  
    closeNewElementDialog: () => dispatch(closeNewElementDialog()), 
    addElement: (groupId, type, id) => dispatch(addElement(id, groupId, id, type, 0, 0)), 
    selectElement: (type, id) => dispatch(selectInputInNewElementDialog(type, id)),
    selectGroup: groupId => dispatch(selectGroup(groupId))
  }
}


const InputGroupsCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGroupsCenterColumn);

export default InputGroupsCenterColumnContainer;