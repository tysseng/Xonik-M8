import React from 'react';
import $  from 'jquery';

let nodeTypes = require('../../../../shared/matrix/NodeTypes.js').idMap;

const NodeList = ({links, onDeleteClick}) => {
  return (
    <div>
      <h3>Links</h3>
      <ul>
        {links.map(link => {
          return (
            <li key={link.id}>
              From node {link.from} to param {link.toParam} of node {link.to}&nbsp;
              <a href="#" onClick={() => onDeleteClick(link.id)}>Delete</a>
            </li>            
          )
        })}    
      </ul>
    </div>
  )
}

export default NodeList;