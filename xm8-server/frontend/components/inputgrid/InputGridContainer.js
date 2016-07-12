import React from 'react';
import { connect } from 'react-redux'; 
import {selectElement, deselectElement, moveElement} from '../../../shared/state/actions/inputgrid.js'

import InputGrid from './InputGrid';

const mapStateToProps = (state, ownProps) => {

  return {
    selectedElement: state.inputgrid.get('selectedElement'),
    dragStart: state.inputgrid.get('dragStart').toJS(),
    offset: state.inputgrid.get('offset').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    selectElement: (id, mouseX, mouseY, offsetXem, offsetYem) => dispatch(selectElement(id, mouseX, mouseY, offsetXem, offsetYem)),
    moveElement: (id, x, y) => dispatch(moveElement(id, x,y)),
    deselectElement: () => dispatch(deselectElement())
  }
}


const InputGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGrid);

export default InputGridContainer;