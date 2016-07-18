import React from 'react';

import LinkDialog from './LinkDialog';
import GraphSvg from './GraphSvg';
import FileDialogContainer from '../filesystem/FileDialogContainer';


const GraphCenterColumn = ({
  nodes, links, mode, selectedNodeId, selectedLinkId, shouldAutoUpdate, linkDialog, offsetX, offsetY,
  showFileDialog, toggleAutoUpdate, onNodeMove, onNodeClick, onNodeMoveEnded, onNodeDeleteClick, onLinkClick, onLinkDeleteClick, onCreateNewNode,
  setLinkFromNode, setLinkToNode, cancelLinkCreation, createLink, onNodeTypeChange}) => {

  return ( 
    <div>

      {showFileDialog && <FileDialogContainer path='/patches' headingPostfix='patch' saveUrl='/api/graph/save' loadUrl = '/api/graph/load'/> } 
      {linkDialog.show && <LinkDialog nodes={nodes} linkDialog={linkDialog} onCancel={cancelLinkCreation} onCreate={createLink} onNodeTypeChange={onNodeTypeChange}/> }    

      <GraphSvg 
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

export default GraphCenterColumn;