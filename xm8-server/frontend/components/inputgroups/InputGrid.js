// TODO: Should separate drag ended and element clicked. A short click without a drag will now add an entry in the undo buffer.

import Controller from '../control/Controller';
import { inputTypesById } from '../../../shared/inputs/InputTypes';
import { getOffset } from '../positionTools.js';

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

const onMouseDown = (e, selectElement) => {

  let clickedElement = findDraggableElement(e.target);
  if(!clickedElement) return;

  // recalculate em size, font may have changed (?)
  calculateEmSize();

  // where is the element we want to drag now, in relation to the surrounding div.
  let elementOffset = getOffset(clickedElement);
  
  selectElement(clickedElement.id,  e.pageX, e.pageY, elementOffset.x / emSize, elementOffset.y / emSize);
}

const onDrag = (e, dragStart, selectedGroupId, dragElementId, moveElementCallback) => {
  if(dragElementId !== ''){

    let selectedElement = document.getElementById(dragElementId);

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
      moveElementCallback(selectedGroupId, dragElementId, newX, newY);
    }

  }
}

const InputGrid = ({dragElementId, selectedGroup, inputs, dragStart, selectElement, moveElement, deselectDragElement}) => {

  if(!selectedGroup){
    return null;
  }

  return (
    <div id="inputgrid"
         className="controllerGroup grid"
         onMouseUp={deselectDragElement}
         onMouseDown={(e) => onMouseDown(e, selectElement)}
         onMouseMove={(e) => onDrag(e, dragStart, selectedGroup.id, dragElementId, moveElement)}>
      { selectedGroup && Object.values(selectedGroup.elements).map(element => {

          let input = inputs[element.elementId];

          // override default input type to render input differently for this group
          if(element.type && element.type !== ''){
            input.type = element.type;
          }

          let type = inputTypesById[input.type];
          
          let style={
            top: element.offset.y + 'em',
            left: element.offset.x + 'em',
            height: type.size.y + 'em',
            width: type.size.x + 'em'
          };

          let classnames = 'controller draggable' + (element.id === dragElementId ? ' selected' : '');

          return (
            <div className={classnames} id={element.id} style={style}>
              <Controller input={input} value={0}/>
            </div>
          )
        })
      }
    </div>
  )
}

export default InputGrid;