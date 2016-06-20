import MenuItem from '../framework/MenuItem';

const MatrixLeftMenu = ({mode, selectedNodeId, selectedLinkId, onPatchSave, onPatchLoad, selectedFileDetails, onDelete, onCreate, onModeChange, onUpdateVoice, shouldAutoUpdate}) => {    
  
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
        <MenuItem label="Undo" icon="circular-arrow-1.svg" onClick={() => console.log("undo")}/>
        <MenuItem label="Redo" icon="circular-arrow.svg" onClick={() => console.log("redo")}/>
      </div>
      <div className="leftMenu">
        <MenuItem label="Update voice" icon="reload-1.svg" onClick={onUpdateVoice} disabled={shouldAutoUpdate}/>
        <MenuItem label="Save" icon="download.svg" onClick={() => onPatchSave(selectedFileDetails)}/>
        <MenuItem label="Load" icon="upload 2.svg" onClick={onPatchLoad}/>
        <MenuItem label="Load" icon="photo-camera-3.svg" onClick={() => console.log("Snapshot")}/>
      </div>
    </div>
  )
}

export default MatrixLeftMenu;