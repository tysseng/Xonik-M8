import React from 'react';
import FileListItem from './FileListItem';
import _ from 'lodash';

const FileList = ({files, selectedFilename, onFileClick}) => {
  if(!files){
    return (<div>...loading files</div>);
  }

  return (
    <div className="list">        
      <h3>Files</h3>
      <ul>
        {_.map(files, file => {
          return (
            <FileListItem file={file} selectedFilename={selectedFilename} onFileClick={onFileClick} key={file.id}/>
          )
        })}    
      </ul>
    </div>
  )
}

export default FileList;