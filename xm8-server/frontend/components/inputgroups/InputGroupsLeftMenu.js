import MenuItem from '../framework/MenuItem';

const InputGroupsLeftMenu = ({ selectedGroupId, selectedElementId, onOpenNewElementDialog, newGroup, deleteGroup, deleteElement }) => {
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Add group" icon="settings.svg" onClick={newGroup}/>
        <MenuItem label="Delete group" icon="garbage.svg" onClick={() => deleteGroup(selectedGroupId)}/>
      </div>
      <div className="leftMenu">
        <MenuItem label="Add element" icon="volume-control.svg" onClick={onOpenNewElementDialog}/>
        <MenuItem label="Delete element " icon="garbage.svg" onClick={() => deleteElement(selectedElementId, selectedGroupId)}/>
      </div>
    </div>
  )
}

export default InputGroupsLeftMenu;