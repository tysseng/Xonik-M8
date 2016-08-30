import MenuItem from '../../framework/MenuItem';

const VirtualInputsLeftMenu = ({selectedInput, onCreate, onDelete }) => {
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Create" icon="volume-control.svg" onClick={onCreate}/>
        <MenuItem label="Delete" icon="garbage.svg" disabled={selectedInput === undefined || selectedInput === '' } onClick={() => onDelete(selectedInput)}/>
      </div>
    </div>
  )
}

export default VirtualInputsLeftMenu;