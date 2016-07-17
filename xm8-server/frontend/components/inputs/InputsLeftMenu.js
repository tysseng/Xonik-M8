import MenuItem from '../framework/MenuItem';

const InputsLeftMenu = ({ selectedInputId, onNewInput, onDelete, onUndo, onRedo, onInputsSave, onInputsLoad }) => {    
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="New input" icon="add-2.svg" onClick={onNewInput}/>
        <MenuItem label="Delete input" icon="garbage.svg" onClick={() => onDelete(selectedInputId)}/>
      </div>
      <div className="leftMenu">
        <MenuItem label="Undo" icon="circular-arrow-1.svg" onClick={onUndo}/>
        <MenuItem label="Redo" icon="circular-arrow.svg" onClick={onRedo}/>
      </div>      
      <div className="leftMenu">
        <MenuItem label="Save" icon="download.svg" onClick={() => onInputsSave()}/>
        <MenuItem label="Load" icon="upload 2.svg" onClick={onInputsLoad}/>
      </div>      
    </div>
  )
}

export default InputsLeftMenu;