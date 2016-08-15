import MenuItem from '../../framework/MenuItem';

const VirtualInputsLeftMenu = ({selectedInput, onCreate, onDelete, onUndo, onRedo}) => {    
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Create" icon="add-2.svg" onClick={onCreate}/>
        <MenuItem label="Delete" icon="garbage.svg" onClick={() => onDelete(selectedInput)}/>
      </div>    
      <div className="leftMenu">
        <MenuItem label="Undo" icon="circular-arrow-1.svg" onClick={onUndo}/>
        <MenuItem label="Redo" icon="circular-arrow.svg" onClick={onRedo}/>
      </div>          
    </div>
  )
}

export default VirtualInputsLeftMenu;