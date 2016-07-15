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

const onMouseDown = (e, selectElement) => {

  let clickedElement = findDraggableElement(e.target);
  if(!clickedElement) return;

  // recalculate em size, font may have changed (?)
  calculateEmSize();

  // where is the element we want to drag now, in relation to the surrounding div.
  let elementOffset = getOffset(clickedElement);
  
  selectElement(clickedElement.id,  e.pageX, e.pageY, elementOffset.x, elementOffset.y);
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

const InputGrid = ({dragElementId, selectedGroup, inputs, offset, dragStart, selectElement, moveElement, deselectDragElement}) => {

  return (
    <div id="inputgrid" className="grid" onMouseUp={deselectDragElement} onMouseDown={(e) => onMouseDown(e, selectElement)} onMouseMove={(e) => onDrag(e, dragStart, selectedGroup.id, dragElementId, moveElement)}>
    { selectedGroup && Object.values(selectedGroup.elements).map(element => {

        // todo swith on element type here (input or group)
        // TODO: or maybe groups in group are not necessary?
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
        }

        let classnames = 'draggable' + (element.id === dragElementId ? ' selected' : '');

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