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
  mode, 
  rootFolder,
  files,
  selectedFileId, 
  selectedFolderId,
  selectedFileVersion, 
  filename,
  onFolderClick, 
  onNewFolderClick, 
  onFolderDeleteClick, 
  onFileClick,
  onFilenameInputChange,
  onFileSaveClick,
  onFileLoadClick,
  onDialogClose}) => {

  let actionButtonLabel;
  let onFileActionClick;
  if( mode === 'save' || mode === 'saveas'){
    actionButtonLabel = 'Save';
    onFileActionClick = onFileSaveClick;
  } else if( mode === 'load'){
    actionButtonLabel = 'Load';
    onFileActionClick = onFileLoadClick; 
  }

  return (
    <div>
      <div>
        <NewFolderForm selectedFolderId={selectedFolderId} onNewFolderClick={onNewFolderClick}/>
        <FolderList rootFolder={rootFolder} selectedFolderId={selectedFolderId} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick}/>
      </div>  
      <div>
        <FileList files={files} selectedFilename={filename} onFileClick={onFileClick}/>
        <form onSubmit={e =>  submitForm(e, onFileActionClick, selectedFolderId, selectedFileId, selectedFileVersion)}>
          <div>
            <label forHtml="filename">File name:</label>
            <input disabled={mode === 'load'} onChange={(e) => onFilenameInputChange(e.target.value)} id="filename" type="text" value={filename}/>
          </div>  
          <div>
            <button disabled={!filename} type="submit">{actionButtonLabel}</button>
            <button onClick={onDialogClose}>Cancel</button>
          </div> 
        </form>          
      </div>
    </div>
  )
}

export default FileDialog;