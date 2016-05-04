import React from 'react';
import $  from 'jquery';

let nodeTypes = require('../../../../shared/matrix/NodeTypes.js').idMap;

const NodeList = ({nodes, onNodeClick}) => {
  return (
    <ul>
      {nodes.map(node => {
        let nodeTypeDefinition = nodeTypes[node.type];
        let name = nodeTypeDefinition ? "(" + nodeTypeDefinition.name + ")": "(Type not selected)";
        return <li key={node.id} onClick={() => onNodeClick(node.id)}>{node.id} {name}</li>
      })}    
    </ul>
  )
}

export default NodeList;