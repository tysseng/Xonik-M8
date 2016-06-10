import React from 'react';
import EditFolderForm from './EditFolderForm';
import FolderList from './FolderList';
import FileList from './FileList';
import FileActionsForm from './FileActionsForm';
import _ from 'lodash';

const FileDialog = ({
  headingPostfix,
  mode, 
  rootFolder,
  files,
  selectedFolder, 
  selectedFileId, 
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

  let heading;
  if( mode === 'save' || mode === 'saveas'){
    heading = 'Save ' + headingPostfix;
  } else if( mode === 'load'){
    heading = 'Load ' + headingPostfix;
  }

  return (
    <div className="filedialog">
      <div className="modalBox">
        <div className="heading">{heading}</div>
        <div className="folders">          
          <FolderList rootFolder={rootFolder} selectedFolder={selectedFolder} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick}/>
          {
            mode === 'save' && 
            <EditFolderForm selectedFolder={selectedFolder} onNewFolderSave={onNewFolderSave} onNewFolderOpen={onNewFolderOpen} onNewFolderClose={onNewFolderClose} onFolderDeleteClick={onFolderDeleteClick} showNewFolderDialog={showNewFolderDialog}/>
          }          
        </div>  
        <div className="files">
          <FileList files={files} selectedFilename={filename} onFileClick={onFileClick}/>          
          <FileActionsForm 
              mode={mode} 
              filename={filename} 
              selectedFolder={selectedFolder}
              onDialogClose={onDialogClose}
              selectedFileId={selectedFileId}
              selectedFileVersion={selectedFileVersion}
              onFileSaveClick={onFileSaveClick} 
              onFileLoadClick={onFileLoadClick}
              onFilenameInputChange={onFilenameInputChange}/>
        </div>
      </div>
    </div>
  )
}

export default FileDialog;