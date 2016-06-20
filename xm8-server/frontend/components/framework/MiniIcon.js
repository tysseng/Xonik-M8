const MiniIcon = ({label, icon, onClick, selected, target = "Capa_1"}) => {

  let svgClassName = "miniicon";
  let labelClassName = "miniicon";
  if(selected){
    svgClassName += " selected";
    labelClassName += " selected";
  }

  return (
    <span>
      <svg className={svgClassName} onClick={onClick}>
        <filter id="drop-shadow"  x="-30%" y="-30%" width="150%" height="150%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur"/>
          <feColorMatrix result="bluralpha" type="matrix" values=
                  "1 0 0 0   0
                   0 1 0 0   0
                   0 0 1 0   0
                   0 0 0 0.9 0 "/>
          <feOffset in="bluralpha" dx="1" dy="1" result="offsetBlur"/>
          <feMerge>
            <feMergeNode in="offsetBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>        
        <use xlinkHref={"img/icons/" + icon + "#" + target}></use>
      </svg>
    </span>
  )
}

export default MiniIcon;