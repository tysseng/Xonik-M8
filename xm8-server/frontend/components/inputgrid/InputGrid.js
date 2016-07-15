import Controller from '../control/Controller';
import { inputTypesById } from '../../../shared/inputs/InputTypes';

const findDraggableElement = (el) => {
  while(el){
    if(el.hasAttribute('class') && el.getAttribute('class').indexOf('draggable') > -1){
      return el;
    }
    el = el.parentElement;
  }
  return undefined;
}

// calculate em size as grid is em based but position is in pixels
let emSize;
const calculateEmSize = () => { 
  let grid = document.getElementById('inputgrid');
  emSize = Number(getComputedStyle(grid, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]);
}

const getOffset = (element) => {
  return {
    x: Number(getComputedStyle(element, "").left.match(/(\d*(\.\d*)?)px/)[1]) / emSize,
    y: Number(getComputedStyle(element, "").top.match(/(\d*(\.\d*)?)px/)[1]) / emSize    
  }
}

const onMouseDown = (e, selectElementCallback) => {
  let clickedElement = findDraggableElement(e.target);
  if(!clickedElement) return;

  // recalculate em size, font may have changed (?)
  calculateEmSize();

  // where is the element we want to drag now, in relation to the surrounding div.
  let elementOffset = getOffset(clickedElement);
  
  selectElementCallback(clickedElement.id,  e.pageX, e.pageY, elementOffset.x, elementOffset.y);
}

const onDrag = (e, dragStart, selectedGroupId, selectedElementId, moveElementCallback) => {
  if(selectedElementId !== ''){

    let selectedElement = document.getElementById(selectedElementId);

    // how long is the current drag in ems?
    let draggedEmsX = Math.floor((e.pageX - dragStart.x) / emSize);
    let draggedEmsY = Math.floor((e.pageY - dragStart.y) / emSize);

    // where is the element to drag right now
    let elementOffset = getOffset(selectedElement);

    // where should it be
    let newX = dragStart.originX + draggedEmsX;
    let newY = dragStart.originY + draggedEmsY;

    // if wanted and current positions are not the same, move element.
    if(newX !== elementOffset.x || newY !== elementOffset.y){
      moveElementCallback(selectedGroupId, selectedElementId, newX, newY);
    }

  }
}

const InputGrid = ({selectedElementId, selectedGroup, inputs, offset, dragStart, selectElement, moveElement, deselectElement}) => {

  // position element according to offset.
  //TODO: get element size from input type
  //TODO: set and get position on element in group
  //TODO: Change div id


  return (
    <div id="inputgrid" className="grid" onMouseDown={(e) => onMouseDown(e, selectElement)} onMouseUp={deselectElement} onMouseMove={(e) => onDrag(e, dragStart, selectedGroup.id, selectedElementId, moveElement)}>
    { selectedGroup && Object.values(selectedGroup.elements).map(element => {

        // todo swith on element type here
        let input = inputs[element.elementId];
        let type = inputTypesById[input.type];
        console.log(type)

        let style={
          top: element.offset.y + 'em',
          left: element.offset.x + 'em',
          height: type.size.y + 'em',
          width: type.size.x + 'em'
        }

        return (
          <div className="draggable selected" id={element.id} style={style}>
            <Controller input={input} value={0}/>
          </div>
        )
      })
    }
    </div>
  )
}

export default InputGrid;