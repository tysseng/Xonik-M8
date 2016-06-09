import React from 'react';
import FolderListItem from './FolderListItem';
import NewFolderForm from './NewFolderForm';
import _ from 'lodash';

const FolderList = ({rootFolder, selectedFolder, onFolderClick, onFolderDeleteClick}) => {
  if(!rootFolder){
    return (<div>...loading folders</div>);
  }

  return (
    <div className="list">
      <ul>
        <FolderListItem folder={rootFolder} selectedFolder={selectedFolder} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick} key={rootFolder.id}/>
      </ul>
    </div>
  )
}

export default FolderList;