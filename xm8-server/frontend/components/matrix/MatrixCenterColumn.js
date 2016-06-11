import React from 'react';
import NodeList from './NodeList';
import LinkList from './LinkList';

const MatrixCenterColumn = ({nodes, links, shouldAutoUpdate, toggleAutoUpdate, forceUpdate, onNodeClick, onNodeDeleteClick, onLinkClick, onLinkDeleteClick, onCreateNewNode}) => {    
  return ( 
    <div>
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