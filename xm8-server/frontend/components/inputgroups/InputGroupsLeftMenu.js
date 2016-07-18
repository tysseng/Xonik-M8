import MenuItem from '../framework/MenuItem';

const InputGroupsLeftMenu = ({ onOpenNewElementDialog, newGroup, onUndo, onRedo, onInputGroupsSave, onInputGroupsLoad }) => {    
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Add group" icon="add-2.svg" onClick={newGroup}/>
        <MenuItem label="Add element" icon="add-2.svg" onClick={onOpenNewElementDialog}/>
        <MenuItem label="Delete" icon="garbage.svg" onClick={() => onDelete(selectedNodeId, selectedLinkId)}/>
      </div>
      <div className="leftMenu">
        <MenuItem label="Undo" icon="circular-arrow-1.svg" onClick={onUndo}/>
        <MenuItem label="Redo" icon="circular-arrow.svg" onClick={onRedo}/>
      </div>      
      <div className="leftMenu">
        <MenuItem label="Save" icon="download.svg" onClick={() => onInputGroupsSave()}/>
        <MenuItem label="Load" icon="upload 2.svg" onClick={onInputGroupsLoad}/>
      </div>      
    </div>
  )
}

export default InputGroupsLeftMenu;