import React from 'react';
import NodeList from './NodeList';
import LinkList from './LinkList';
import FileDialogContainer from '../filesystem/FileDialogContainer';

const MatrixCenterColumn = ({nodes, links, shouldAutoUpdate, showFileDialog, toggleAutoUpdate, forceUpdate, onNodeClick, onNodeDeleteClick, onLinkClick, onLinkDeleteClick, onCreateNewNode}) => {    
  return ( 
    <div>
      {showFileDialog && <FileDialogContainer path='/patches' headingPostfix='patch' saveUrl='/matrix/save' loadUrl = '/matrix/load'/> }     
      <input id="autoUpdate" type="checkbox" checked={shouldAutoUpdate} onChange={(e) => toggleAutoUpdate(e.target.checked)}/>
      <label htmlFor="autoUpdate">Auto update synth voice</label><br/>

      <button disabled={shouldAutoUpdate} onClick={forceUpdate}>Update voice</button>

      <NodeList nodes={nodes} onNodeClick={onNodeClick} onDeleteClick={onNodeDeleteClick}/>
      <LinkList links={links} onLinkClick={onLinkClick} onDeleteClick={onLinkDeleteClick}/>

      <a href="#" onClick={(e) => { 
        e.preventDefault(); 
        onCreateNewNode();
        
      }}>Add node</a><br/>
    </div>
  )
}

export default MatrixCenterColumn;