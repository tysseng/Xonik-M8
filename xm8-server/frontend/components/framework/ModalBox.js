const ModalBox = ({id, heading, children, boxClass}) => {

  let boxClassName = 'box';
  if(boxClass){
    boxClassName += ' ' + boxClass;
  } 

  return ( 
    <div id={id} className="modal">
      <div className={boxClassName}>
        <div className="heading">{heading}</div>
        <div className="contents">{children}</div>
      </div>
    </div>
  )
}

export default ModalBox;