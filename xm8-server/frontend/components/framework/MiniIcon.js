const MiniIcon = ({label, icon, onClick, selected, target = "Capa_1"}) => {

  let svgClassName = "image";
  let labelClassName = "name";
  if(selected){
    svgClassName += " selected";
    labelClassName += " selected";
  }

  return (
    <span className='miniicon'>
      <svg className={svgClassName} onClick={onClick}>      
        <use xlinkHref={"img/icons/" + icon + "#" + target}></use>
      </svg>
    </span>
  )
}

export default MiniIcon;