import React from 'react';
import NodeList from './NodeList';
import LinkList from './LinkList';
import MatrixSvg from './MatrixSvg';
import FileDialogContainer from '../filesystem/FileDialogContainer';

const MatrixCenterColumn = ({
  nodes, links, mode, selectedNodeId, selectedLinkId, shouldAutoUpdate, linkFromNodeId, linkToNodeId, 
  showFileDialog, toggleAutoUpdate, onNodeMove, onNodeClick, onNodeDeleteClick, onLinkClick, onLinkDeleteClick, onCreateNewNode,
  setLinkFromNode, setLinkToNode, cancelLinkCreation}) => {
  return ( 
    <div>
      {showFileDialog && <FileDialogContainer path='/patches' headingPostfix='patch' saveUrl='/matrix/save' loadUrl = '/matrix/load'/> }     
      <input id="autoUpdate" type="checkbox" checked={shouldAutoUpdate} onChange={(e) => toggleAutoUpdate(e.target.checked)}/>
      <label htmlFor="autoUpdate">Auto update synth voice</label><br/>

      <MatrixSvg 
        nodes={nodes} 
        links={links} 
        mode={mode}
        linkFromNodeId={linkFromNodeId} 
        linkToNodeId={linkToNodeId}
        selectedNodeId={selectedNodeId} 
        selectedLinkId={selectedLinkId} 
        onNodeMove={onNodeMove} 
        onNodeClick={onNodeClick}
        onLinkClick={onLinkClick}
        setLinkFromNode={setLinkFromNode}
        setLinkToNode={setLinkToNode}
        cancelLinkCreation={cancelLinkCreation}/>
    </div>
  )
}

export default MatrixCenterColumn;