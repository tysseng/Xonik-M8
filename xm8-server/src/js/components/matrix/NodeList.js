import React from 'react';
import $  from 'jquery';

let nodeTypes = require('../../../../shared/matrix/NodeTypes.js').idMap;

const NodeList = ({nodes, onNodeClick, onDeleteClick}) => {
  return (
    <div>
      <h3>Nodes</h3>

      <ul>
        {nodes.map(node => {
          let nodeTypeDefinition = nodeTypes[node.type];
          let name = nodeTypeDefinition ? "(" + nodeTypeDefinition.name + ")": "(Type not selected)";
          let color = node.valid ? {} : {color: '#ff0000'};
          return (
              <li key={node.id} style={color}>
                <span onClick={() => onNodeClick(node.id)}>{node.id} {name} </span>
                <a href="#" onClick={() => onDeleteClick(node.id)}>Delete</a>
              </li>
          )
        })}    
      </ul>
    </div>
  )
}

export default NodeList;