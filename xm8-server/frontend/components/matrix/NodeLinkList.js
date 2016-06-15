import React from 'react';
import NodeList from './NodeList';
import LinkList from './LinkList';

const NodeLinkList = ({nodes, links, selectedNodeId, selectedLinkId, onNodeClick, onNodeDeleteClick, onLinkClick, onLinkDeleteClick}) => {    
  return (
    <div>
    {!selectedNodeId && !selectedLinkId &&
      <div>
        <NodeList nodes={nodes} onNodeClick={onNodeClick} onDeleteClick={onNodeDeleteClick}/>
        <LinkList links={links} onLinkClick={onLinkClick} onDeleteClick={onLinkDeleteClick}/>
      </div>
    }
    </div>
  )
}

export default NodeLinkList;