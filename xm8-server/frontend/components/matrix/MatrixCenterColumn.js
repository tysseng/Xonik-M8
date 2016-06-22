import React from 'react';

import LinkDialog from './LinkDialog';
import MatrixSvg from './MatrixSvg';
import FileDialogContainer from '../filesystem/FileDialogContainer';


const MatrixCenterColumn = ({
  nodes, links, mode, selectedNodeId, selectedLinkId, shouldAutoUpdate, linkDialog, offsetX, offsetY,
  showFileDialog, toggleAutoUpdate, onNodeMove, onNodeClick, onNodeMoveEnded, onNodeDeleteClick, onLinkClick, onLinkDeleteClick, onCreateNewNode,
  setLinkFromNode, setLinkToNode, cancelLinkCreation, createLink, onNodeTypeChange}) => {
  return ( 
    <div>

      
      {showFileDialog && <FileDialogContainer path='/patches' headingPostfix='patch' saveUrl='/matrix/save' loadUrl = '/matrix/load'/> } 
      {linkDialog.show && <LinkDialog nodes={nodes} linkDialog={linkDialog} onCancel={cancelLinkCreation} onCreate={createLink} onNodeTypeChange={onNodeTypeChange}/> }    

      <MatrixSvg 
        nodes={nodes} 
        links={links} 
        mode={mode}
        offsetX={offsetX}
        offsetY={offsetY}
        linkDialog={linkDialog}
        selectedNodeId={selectedNodeId} 
        selectedLinkId={selectedLinkId} 
        onNodeMove={onNodeMove} 
        onNodeClick={onNodeClick}
        onNodeMoveEnded={onNodeMoveEnded}
        onLinkClick={onLinkClick}
        setLinkFromNode={setLinkFromNode}
        setLinkToNode={setLinkToNode}/>


      <input id="autoUpdate" type="checkbox" checked={shouldAutoUpdate} onChange={(e) => toggleAutoUpdate(e.target.checked)}/>
      <label htmlFor="autoUpdate">Auto update synth voice</label><br/>
        
    </div>
  )

}

export default MatrixCenterColumn;