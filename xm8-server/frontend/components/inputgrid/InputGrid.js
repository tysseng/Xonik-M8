import $ from 'jquery';

function getPosition(el) {
  var xPosition = 0;
  var yPosition = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
      var yScrollPos = el.scrollTop || document.documentElement.scrollTop;
 
      xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
      yPosition += (el.offsetTop - yScrollPos + el.clientTop);
    } else {
      xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPosition,
    y: yPosition
  };
}

const findDraggableElement = (el) => {
  while(el){
    if(el.hasAttribute('class') && el.getAttribute('class').indexOf('draggable') > -1){
      return el;
    }
    el = el.parentElement;
  }
  return undefined;
}


let emSize;

const calculateEmSize = () => { 
  let grid = document.getElementById('inputgrid');
  emSize = Number(getComputedStyle(grid, "").fontSize.match(/(\d*(\.\d*)?)px/)[1]);
}

const onMouseDown = (e, selectElement) => {
  let clickedElement = findDraggableElement(e.target);
  if(!clickedElement) return;

  calculateEmSize();
  selectElement(clickedElement.getAttribute('data-element-id'),  e.pageX, e.pageY);
}

const handleRelease = e => {
  console.log("Up ", e.pageX, e.pageY, getPosition(e.target).x,e.target.parentElement);
}

const handleDrag = (e, dragStart, selectedElement) => {
  if(selectedElement !== ''){
    let draggedEmsX = Math.floor((e.pageX - dragStart.x) / emSize);
    let draggedEmsY = Math.floor((e.pageY - dragStart.y) / emSize);

    console.log("Dragged. Start ", draggedEmsX, draggedEmsY);
  }
}

const InputGrid = ({selectedElement, dragStart, selectElement, moveElement, deselectElement}) => {
  return (
    <div id="inputgrid" className="grid" onMouseDown={(e) => onMouseDown(e, selectElement)} onMouseUp={deselectElement} onMouseMove={(e) => handleDrag(e, dragStart, selectedElement)}>
      <div className="draggable selected" data-element-id='45'></div>
    </div>
  )
}

export default InputGrid;