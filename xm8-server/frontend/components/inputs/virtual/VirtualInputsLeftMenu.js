import MenuItem from '../../framework/MenuItem';

const VirtualInputsLeftMenu = ({onUndo, onRedo}) => {    
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Undo" icon="circular-arrow-1.svg" onClick={onUndo}/>
        <MenuItem label="Redo" icon="circular-arrow.svg" onClick={onRedo}/>
      </div>          
    </div>
  )
}

export default VirtualInputsLeftMenu;