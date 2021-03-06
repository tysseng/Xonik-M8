import React from 'react';
import { connect } from 'react-redux'; 
import { addElement } from '../../../shared/state/actions/inputgroups';
import { closeNewElementDialog, selectInputInNewElementDialog, selectGroup } from '../../../shared/state/actions/gui/guiinputgroups';
import { getGuiVirtualInputGroups } from '../../state/selectors';
import InputGroupsCenterColumn from './InputGroupsCenterColumn';

const mapStateToProps = (state, ownProps) => {

  let inputgroups = getGuiVirtualInputGroups(state);
  let selectedGroupId = inputgroups.get('selectedGroup');

  return {
    selectedGroupId,
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