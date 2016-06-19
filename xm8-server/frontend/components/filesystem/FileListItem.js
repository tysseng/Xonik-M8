import React from 'react';
import _ from 'lodash';

const FileListItem = ({file, selectedFilename, onFileClick, onFolderDeleteClick}) => {
  let className = file.name === selectedFilename ? 'selected' : '';
  return (
    <li>
      <span onClick={() => onFileClick(file.id, file.version, file.name)} className={className}>{file.name}</span>
    </li>
  )
}

export default FileListItem;