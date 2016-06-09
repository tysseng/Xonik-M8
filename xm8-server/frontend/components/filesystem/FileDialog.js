import React from 'react';
import NewFolderForm from './NewFolderForm';
import FolderList from './FolderList';
import FileList from './FileList';
import _ from 'lodash';

const submitForm = (e, onFileActionClick, selectedFolderId, selectedFileId, selectedFileVersion) => {
  e.preventDefault();
  let filename = e.target.filename.value;
  if(filename) {
    onFileActionClick(filename, selectedFolderId, selectedFileId, selectedFileVersion);    
  }
}

const FileDialog = ({
  headingPostfix,
  mode, 
  rootFolder,
  files,
  selectedFileId, 
  selectedFolderId,
  selectedFileVersion, 
  filename,
  showNewFolderDialog,
  onFolderClick, 
  onNewFolderSave,
  onNewFolderOpen, 
  onNewFolderClose, 
  onFolderDeleteClick, 
  onFileClick,
  onFilenameInputChange,
  onFileSaveClick,
  onFileLoadClick,
  onDialogClose}) => {

  let actionButtonLabel;
  let onFileActionClick;
  let heading;
  if( mode === 'save' || mode === 'saveas'){
    actionButtonLabel = 'Save';
    onFileActionClick = onFileSaveClick;
    heading = 'Save ' + headingPostfix;
  } else if( mode === 'load'){
    actionButtonLabel = 'Load';
    onFileActionClick = onFileLoadClick; 
    heading = 'Load ' + headingPostfix;
  }

  return (
    <div className="filedialog">
      <div className="modalBox">
        <div className="heading">{heading}</div>
        <div className="folders">          
          <FolderList rootFolder={rootFolder} selectedFolderId={selectedFolderId} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick}/>
          {
            mode === 'save' && 
            <NewFolderForm selectedFolderId={selectedFolderId} onNewFolderSave={onNewFolderSave} onNewFolderOpen={onNewFolderOpen} onNewFolderClose={onNewFolderClose} onFolderDeleteClick={onFolderDeleteClick} showNewFolderDialog={showNewFolderDialog}/>
          }          
        </div>  
        <div className="files">
          <FileList files={files} selectedFilename={filename} onFileClick={onFileClick}/>          
          <div className="new">
            <form onSubmit={e =>  submitForm(e, onFileActionClick, selectedFolderId, selectedFileId, selectedFileVersion)}>
              {mode === 'save' &&
                <div>
                  <label forHtml="filename">Name</label>
                  <input disabled={mode === 'load'} onChange={(e) => onFilenameInputChange(e.target.value)} id="filename" type="text" value={filename}/>
                </div>  
              }
              {mode === 'load' &&
                <div>
                  <label forHtml="filename">Name</label>
                  <input id="filename" type="hidden" value={filename}/>
                </div>  
              }              
              <div>                
                <button onClick={onDialogClose}>Cancel</button>
                <button disabled={!filename} type="submit">{actionButtonLabel}</button>
              </div> 
            </form>  
          </div>        
        </div>
      </div>
    </div>
  )
}

export default FileDialog;