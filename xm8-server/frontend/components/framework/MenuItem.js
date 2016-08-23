import { Link } from 'react-router';

const MenuItem = ({label, icon, onClick, selected, target = "Capa_1"}) => {

  let svgClassName = "image";
  let labelClassName = "name";
  if(selected){
    svgClassName += " selected";
    labelClassName += " selected";
  }

  return (
    <span className="menuicon" onClick={onClick}>
      <svg className={svgClassName}>
        <use xlinkHref={"img/icons/" + icon + "#" + target}></use>
      </svg>
      <div className={labelClassName}>{label}</div>
    </span>
  )
}

export default MenuItem;