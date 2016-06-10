import React from 'react';

const submitForm = (e, onFileActionClick, selectedFolder, selectedFileId, selectedFileVersion) => {
  e.preventDefault();
  let filename = e.target.filename.value;
  if(filename) {
    onFileActionClick(filename, selectedFolder.id, selectedFileId, selectedFileVersion);    
  }
}

const FileActionsForm = ({mode, filename, onFileSaveClick, onFileLoadClick, selectedFolder, selectedFileId, selectedFileVersion, onFilenameInputChange, onDialogClose}) => {

  let actionButtonLabel;
  let onFileActionClick;
  if( mode === 'save' || mode === 'saveas'){
    actionButtonLabel = 'Save';
    onFileActionClick = onFileSaveClick;
  } else if( mode === 'load'){
    actionButtonLabel = 'Load';
    onFileActionClick = onFileLoadClick; 
  }

  return (
    <div className="new">
      <form onSubmit={e =>  submitForm(e, onFileActionClick, selectedFolder, selectedFileId, selectedFileVersion)}>
        {mode === 'save' &&
          <div>
            <label forHtml="filename">Name</label>
            <input disabled={mode === 'load'} onChange={(e) => onFilenameInputChange(e.target.value)} id="filename" type="text" value={filename}/>
          </div>  
        }
        {mode === 'load' &&
          <div>
            <label forHtml="filename">Name</label>
            <input id="filename" type="hidden" value={filename}/> {filename}
          </div>  
        }              
        <div>                
          <button type="button" onClick={onDialogClose}>Cancel</button>
          <button disabled={!filename} type="submit">{actionButtonLabel}</button>
        </div> 
      </form>  
    </div>        
  )
}

export default FileActionsForm;