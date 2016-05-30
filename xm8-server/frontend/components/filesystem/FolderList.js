import React from 'react';
import FolderListItem from './FolderListItem';
import NewFolderForm from './NewFolderForm';
import _ from 'lodash';

const FolderList = ({folders, loadedPatchFileId, selectedFolder, onFolderClick, onNewFolderClick, onFolderDeleteClick, onFileSaveClick}) => {
  if(!folders){
    return (<div>...loading folders</div>);
  }

  return (
    <div>
      <h3>File system</h3>
      <NewFolderForm selectedFolder={selectedFolder} onNewFolderClick={onNewFolderClick}/>
      <button onClick={() => onFileSaveClick('My file', selectedFolder, loadedPatchFileId)}>Save file here</button>
      <h3>Folders</h3>
      <ul>
        {_.map(folders, folder => {
          return (
            <FolderListItem folder={folder} selectedFolder={selectedFolder} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick} key={folder.id}/>
          )
        })}    
      </ul>
    </div>
  )
}

export default FolderList;