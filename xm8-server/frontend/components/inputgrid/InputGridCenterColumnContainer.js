import React from 'react';
import { connect } from 'react-redux'; 
import { closeNewElementDialog, addElement, selectInputInNewElementDialog } from '../../../shared/state/actions/inputgrid';

import InputGridCenterColumn from './InputGridCenterColumn';

const mapStateToProps = (state, ownProps) => {

  let inputgrid = state.inputgrid;
  let inputs = state.inputs.get('byId').toJS();

  return {
    inputs,
    selectedGroupId: inputgrid.get('selectedGroup'),
    showFileDialog: false, 
    newElementDialog: inputgrid.get('newElementDialog').toJS(), 
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {  
    closeNewElementDialog: () => dispatch(closeNewElementDialog()), 
    addElement: (groupId, type, id) => dispatch(addElement(id, groupId, id, type, 0, 0)), 
    selectElement: (type, id) => dispatch(selectInputInNewElementDialog(type, id))
  }
}


const InputGridCenterColumnContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGridCenterColumn);

export default InputGridCenterColumnContainer;