import React from 'react'
import _ from 'lodash'
import { nodeTypesById } from '../../../../shared/graph/NodeTypes';

const NodeLinkDropdown = ({currentnode, nodes, value, onNodeLinkChange}) => {
  let linkableNodes = _.filter(nodes, node => {
    if(node.id !== currentnode.id && node.type !== nodeTypesById.OUTPUT.id){
      return true;
    }
  });

  return (<select value={value} onChange={(e) => {onNodeLinkChange(e.target.value)}}>
    <option value="">Not selected</option>
    {linkableNodes.map(linkableNode => {
      return <option key={linkableNode.id} value={linkableNode.id}>{linkableNode.name}</option>
    })}
  </select>)
}

export default NodeLinkDropdown;