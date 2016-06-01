import React from 'react';
import _ from 'lodash';

const FileListItem = ({file, onFileClick, onFolderDeleteClick}) => {

  return (
    <li>
      <span onClick={() => onFileClick(file.id, file.name)}>{file.name}</span>
    </li>
  )
}

export default FileListItem;