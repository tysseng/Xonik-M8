import React from 'react';

import LinkDialog from './LinkDialog';
import GraphSvg from './GraphSvg';


const GraphCenterColumn = ({
  nodes, links, mode, selectedNodeId, selectedLinkId, shouldAutoUpdate, linkDialog, offsetX, offsetY,
  toggleAutoUpdate, onNodeMove, onNodeClick, onNodeMoveEnded, onLinkClick,
  setLinkFromNode, setLinkToNode, cancelLinkCreation, createLink, onNodeTypeChange}) => {

  return ( 
    <div>

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