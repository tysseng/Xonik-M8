import MenuItem from '../framework/MenuItem';
import { Link } from 'react-router';
import FileDialogContainer from '../filesystem/FileDialogContainer';

const PatchTopMenu = ({showFileDialog, onPatchSave, onPatchLoad, selectedFileDetails, onUndo, onRedo}) => {
  
  return (
    <div>
      <div className="topSubMenu">
        <MenuItem label="Undo" icon="circular-arrow-1.svg" onClick={onUndo}/>
        <MenuItem label="Redo" icon="circular-arrow.svg" onClick={onRedo}/>
      </div>
      <div className="topSubMenu">
        <MenuItem label="Save" icon="download.svg" onClick={() => onPatchSave(selectedFileDetails)}/>
        <MenuItem label="Load" icon="upload 2.svg" onClick={onPatchLoad}/>
        <MenuItem label="Snap-shot" icon="photo-camera-3.svg" onClick={() => console.log("Snapshot")}/>
      </div>

      <div className="topSubMenu right">
        <Link to="/patches" activeClassName="selected">
          <MenuItem label="Graph" icon="network.svg" onClick={() => console.log("Patches")}/>
        </Link>
        <Link to="/matrix" activeClassName="selected">
          <MenuItem label="Matrix" icon="network.svg" onClick={() => console.log("Matrix")}/>
        </Link>
        <Link to="/virtualinputs" activeClassName="selected">
          <MenuItem label="Custom ctrls" icon="settings.svg" onClick={() => console.log("Virtual")}/>
        </Link>
        <Link to="/inputgroups" activeClassName="selected">
          <MenuItem label="Controller groups" icon="settings-1.svg" onClick={() => console.log("Groups")}/>
        </Link>
      </div>

      {showFileDialog && <FileDialogContainer path='/patches' headingPostfix='patch' saveUrl='/api/graph/save' loadUrl = '/api/graph/load'/> }
    </div>
  )
}

export default PatchTopMenu;