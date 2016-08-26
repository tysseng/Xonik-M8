import MenuItem from '../../framework/MenuItem';

const VirtualInputsLeftMenu = ({selectedInput, onCreate, onDelete }) => {
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Create" icon="add-2.svg" onClick={onCreate}/>
        <MenuItem label="Delete" icon="garbage.svg" onClick={() => onDelete(selectedInput)}/>
      </div>
    </div>
  )
}

export default VirtualInputsLeftMenu;