import React from 'react';
import { connect } from 'react-redux'; 
import { closeNewElementDialog, addElement, selectInputInNewElementDialog } from '../../../shared/state/actions/inputgroups';

import InputGroupsCenterColumn from './InputGroupsCenterColumn';

const mapStateToProps = (state, ownProps) => {

  let inputgroups = state.inputgroups;

  return {
    selectedGroupId: inputgroups.get('selectedGroup'),
    showFileDialog: state.filedialog.get('show'),
    newElementDialog: inputgroups.get('newElementDialog').toJS(), 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {  
    closeNewElementDialog: () => dispatch(closeNewElementDialog()), 
    addElement: (groupId, type, id) => dispatch(addElement(id, groupId, id, type, 0, 0)), 
    selectElement: (type, id) => dispatch(selectInputInNewElementDialog(type, id))
  }
}


const InputGroupsCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGroupsCenterColumn);

export default InputGroupsCenterColumnContainer;