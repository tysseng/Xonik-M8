import React from 'react';
import _ from 'lodash';

const FolderListItem = ({folder, selectedFolderId, onFolderClick, onFolderDeleteClick}) => {

  let style = folder.id === selectedFolderId ? {fontWeight: 'bold'} : {};

  let folders = _.sortBy(folder.folders, 'name');
  return (
    <li>
      <div>
        <span onClick={() => onFolderClick(folder.id)} style={style}>{folder.name}</span>
      </div>
      <div>
        <ul>
          {_.map(folders, subFolder => {
            return (
              <FolderListItem folder={subFolder} selectedFolderId={selectedFolderId} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick} key={subFolder.id}/>
            )
          })}
        </ul>
      </div>
    </li>
  )
}

export default FolderListItem;