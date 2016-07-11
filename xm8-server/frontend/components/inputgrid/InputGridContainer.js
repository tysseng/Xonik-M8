import React from 'react';
import { connect } from 'react-redux'; 
import {selectElement, deselectElement, moveElement} from '../../../shared/state/actions/inputgrid.js'

import InputGrid from './InputGrid';

const mapStateToProps = (state, ownProps) => {

  console.log(state.inputgrid.get('selectedElement'))

  return {
    selectedElement: state.inputgrid.get('selectedElement'),
    dragStart: state.inputgrid.get('dragStart').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {  
    selectElement: (id, x, y) => dispatch(selectElement(id, x,y)),
    moveElement: (id, x, y) => dispatch(moveElement(id, x,y)),
    deselectElement: () => dispatch(deselectElement())
  }
}


const InputGridContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGrid);

export default InputGridContainer;
/**
on mouse down:
check if over a draggable element
find grid position by using getEmlementById or similar and using getPosition
set drag start relative to grid by using getPosition of element (find correct element by traversing upwards to a draggable or grid is reached)
store which element is dragged and its original position

ondrag:
calculate drag in em
if number of ems is not the current position of the stored element, trigger move element event

on mouse up
deselect element etc.
**/