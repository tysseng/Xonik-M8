import React from 'react';
import _ from 'lodash';

const FileListItem = ({file, selectedFilename, onFileClick, onFolderDeleteClick}) => {
  let style = file.name === selectedFilename ? {fontWeight: 'bold'} : {};
  return (
    <li>
      <span onClick={() => onFileClick(file.id, file.version, file.name)} style={style}>{file.name}</span>
    </li>
  )
}

export default FileListItem;