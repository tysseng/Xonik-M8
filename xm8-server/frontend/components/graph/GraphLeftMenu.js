import MenuItem from '../framework/MenuItem';

const GraphLeftMenu = ({mode, selectedNodeId, selectedLinkId, selectedPatchNumber, onDelete, onCreate, onModeChange, onUpdateVoice, shouldAutoUpdate, resetGraph}) => {
  
  //<button onClick={() => onPatchSaveAs(selectedFileDetails)}>Save as</button>
  let linkButtonMode = (mode === 'create_link' ? 'default' : 'create_link');

  return ( 
    <div>
      <div className="leftMenu">
        <MenuItem label="Create" icon="add-2.svg" onClick={onCreate}/>
        <MenuItem label="Link" icon="share.svg" onClick={() => onModeChange(linkButtonMode)} selected={mode === 'create_link'}/>
        <MenuItem label="Delete" icon="garbage.svg" onClick={() => onDelete(selectedNodeId, selectedLinkId)}/>
      </div>
      <div className="leftMenu">
        <MenuItem label="Update voice" icon="reload-1.svg" onClick={() => onUpdateVoice(selectedPatchNumber)} disabled={shouldAutoUpdate}/>
      </div>
      <div className="leftMenu">
        <MenuItem label="Reset" icon="garbage.svg" onClick={resetGraph}/>
      </div>
    </div>
  )
}

export default GraphLeftMenu;