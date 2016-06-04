import React from 'react';
import NewFolderForm from './NewFolderForm';
import FolderList from './FolderList';
import FileList from './FileList';
import _ from 'lodash';

const FileDialog = ({
  mode, 
  rootFolder,
  files,
  selectedFileId, 
  selectedFolderId, 
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
        <FileList files={files} selectedFileId={selectedFileId} onFileClick={onFileClick}/>
        <div>
          <label forHtml="filename">File name:</label>
          <input onChange={(e) => onFilenameInputChange(e.target.value)} id="filename" type="text" value={filename}/>
        </div>  
        <div>
          <button onClick={() => onFileActionClick(filename, selectedFolderId, selectedFileId)}>{actionButtonLabel}</button>
          <button onClick={onDialogClose}>Cancel</button>
        </div>  
      </div>
    </div>
  )
}

export default FileDialog;