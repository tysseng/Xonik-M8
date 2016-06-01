import React from 'react';
import FolderListItem from './FolderListItem';
import NewFolderForm from './NewFolderForm';
import _ from 'lodash';

const FolderList = ({folders, selectedFolderId, onFolderClick, onFolderDeleteClick}) => {
  if(!folders){
    return (<div>...loading folders</div>);
  }

  return (
    <div>
      <h3>Folders</h3>
      <ul>
        {_.map(folders, folder => {
          return (
            <FolderListItem folder={folder} selectedFolderId={selectedFolderId} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick} key={folder.id}/>
          )
        })}    
      </ul>
    </div>
  )
}

export default FolderList;