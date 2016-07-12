import MenuItem from '../framework/MenuItem';

const InputGridLeftMenu = ({onOpenNewElementDialog}) => {    
  
  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Add element" icon="add-2.svg" onClick={onOpenNewElementDialog}/>        
        <MenuItem label="Delete" icon="garbage.svg" onClick={() => onDelete(selectedNodeId, selectedLinkId)}/>
      </div>
    </div>
  )
}

export default InputGridLeftMenu;