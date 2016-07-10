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

const handleClick = e => {
  console.log("Clicked ", e.pageX, e.pageY, getPosition(e.target).x,e.target.parentElement);
}

const handleDrag = e => {
  console.log("Dragged ", e.pageX, e.pageY, getPosition(e.target).x);
}

const InputGrid = () => {

  return (
    <div className="grid" onClick={(e) => handleClick(e)} onMouseMove={(e) => handleDrag(e)}>
      <div className="selected"></div>
    </div>
  )
}

export default InputGrid;