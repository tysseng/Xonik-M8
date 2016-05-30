import React from 'react';
import _ from 'lodash';

const FolderListItem = ({folder, selectedFolder, onFolderClick, onFolderDeleteClick}) => {

  let style = folder.id === selectedFolder ? {fontWeight: 'bold'} : {};
  return (
    <li>
      <div><span onClick={() => onFolderClick(folder.id)} style={style}>{folder.name}</span> <span onClick={() => onFolderDeleteClick(folder.id)}>Delete</span></div>
      <div>
        <ul>
          {_.map(folder.folders, subFolder => {
            return (
              <FolderListItem folder={subFolder} selectedFolder={selectedFolder} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick} key={subFolder.id}/>
            )
          })}
        </ul>
      </div>
    </li>
  )
}

export default FolderListItem;