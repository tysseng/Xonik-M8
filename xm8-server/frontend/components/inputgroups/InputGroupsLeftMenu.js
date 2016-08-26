import MenuItem from '../framework/MenuItem';

const InputGroupsLeftMenu = ({ selectedGroup, onOpenNewElementDialog, newGroup, deleteGroup }) => {
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Add group" icon="add-2.svg" onClick={newGroup}/>
        <MenuItem label="Add element" icon="add-2.svg" onClick={onOpenNewElementDialog}/>
        <MenuItem label="Delete" icon="garbage.svg" onClick={() => deleteGroup(selectedGroup)}/>
      </div>
    </div>
  )
}

export default InputGroupsLeftMenu;