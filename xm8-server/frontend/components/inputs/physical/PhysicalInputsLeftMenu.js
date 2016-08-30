import MenuItem from '../../framework/MenuItem';

const InputsLeftMenu = ({selectedInputId, onUndo, onRedo, resetCurrentPhysicalInput, resetPhysicalInputs}) => {
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Undo" icon="circular-arrow-1.svg" onClick={onUndo}/>
        <MenuItem label="Redo" icon="circular-arrow.svg" onClick={onRedo}/>
      </div>
      <div className="leftMenu">
        <MenuItem label="Reset current" icon="garbage.svg" onClick={() => resetCurrentPhysicalInput(selectedInputId)}/>
        <MenuItem label="Reset all" icon="garbage.svg" onClick={resetPhysicalInputs}/>
      </div>
    </div>
  )
}

export default InputsLeftMenu;