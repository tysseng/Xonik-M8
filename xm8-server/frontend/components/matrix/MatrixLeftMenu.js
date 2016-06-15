const MatrixLeftMenu = ({selectedNodeId, selectedLinkId, onPatchSave, onPatchLoad, selectedFileDetails, onDelete, onCreate, onUpdateVoice, shouldAutoUpdate}) => {    
  
  //<button onClick={() => onPatchSaveAs(selectedFileDetails)}>Save as</button>

  return ( 
    <div>
      <span className="icon"><img src="img/icons/add-2.svg" onClick={onCreate}/><div className="name">Create</div></span>
      <span className="icon"><img src="img/icons/share.svg"/><div className="name">Link</div></span>
      <span className="icon"><img src="img/icons/garbage.svg" onClick={() => onDelete(selectedNodeId, selectedLinkId)}/><div className="name">Delete</div></span>
      <span className="icon"><img src="img/icons/reload-1.svg" onClick={onUpdateVoice} disabled={shouldAutoUpdate}/><div className="name">Update voice</div></span>
      <span className="icon"><img src="img/icons/download.svg" onClick={() => onPatchSave(selectedFileDetails)}/><div className="name">Save</div></span>
      <span className="icon"><img src="img/icons/upload 2.svg" onClick={onPatchLoad}/><div className="name">Load</div></span> 
      <span className="icon"><img src="img/icons/circular-arrow-1.svg"/><div className="name">Undo</div></span>
      <span className="icon"><img src="img/icons/circular-arrow.svg"/><div className="name">Redo</div></span>  
      <span className="icon"><img src="img/icons/photo-camera-3.svg"/><div className="name">Snapshot</div></span>  
    </div>
  )
}

export default MatrixLeftMenu;