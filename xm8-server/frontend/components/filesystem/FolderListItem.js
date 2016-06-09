import React from 'react';
import _ from 'lodash';

const FolderListItem = ({folder, selectedFolder, onFolderClick, onFolderDeleteClick}) => {

  console.log(folder.id, selectedFolder)

  let style = folder.id === selectedFolder.id ? {fontWeight: 'bold'} : {};

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
              <FolderListItem folder={subFolder} selectedFolder={selectedFolder} onFolderClick={onFolderClick} onFolderDeleteClick={onFolderDeleteClick} key={subFolder.id}/>
            )
          })}
        </ul>
      </div>
    </li>
  )
}

export default FolderListItem;