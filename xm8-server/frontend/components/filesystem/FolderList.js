import React from 'react';
import FolderListItem from './FolderListItem';
import NewFolderForm from './NewFolderForm';
import _ from 'lodash';

const FolderList = ({rootFolder, selectedFolderId, onFolderClick, onFolderDeleteClick}) => {
  if(!rootFolder){
    return (<div>...loading folders</div>);
  }

  return (
    <div>
      <h3>Folders</h3>
      <ul>
        <FolderListItem folder={rootFolder} selectedFolderId={selectedFolderId} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick} key={rootFolder.id}/>
      </ul>
    </div>
  )
}

export default FolderList;