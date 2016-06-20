import React from 'react';
import $  from 'jquery';

let nodeTypes = require('../../../shared/matrix/NodeTypes.js').idMap;

const NodeList = ({nodes, onNodeClick, onDeleteClick}) => {
  return (
    <div className='configPane nodeList'>
      <div className="heading">Nodes</div>

      <ul>
        {nodes.map(node => {
          let nodeTypeDefinition = nodeTypes[node.type];
          let type = nodeTypeDefinition ? "(" + nodeTypeDefinition.name + ")": "(Type not selected)";
          let color = node.valid ? {} : {color: '#ff0000'};
          return (
            <li key={node.id} style={color}>
              <span onClick={() => onNodeClick(node.id)}>{node.name} {type} </span>
              <a href="#" onClick={() => onDeleteClick(node.id)}>Delete</a>
            </li>
          )
        })}    
      </ul>
    </div>
  )
}

export default NodeList;