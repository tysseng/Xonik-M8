import React from 'react';
import $  from 'jquery';

let nodeTypes = require('../../../../shared/matrix/NodeTypes.js').idMap;

const NodeList = ({links, onLinkClick, onDeleteClick}) => {
  return (
    <div>
      <h3>Links</h3>
      <ul>
        {links.map(link => {
          return (
            <li key={link.id}>
              <span onClick={() => onLinkClick(link.id)}>{link.name} - From node {link.from} to param {link.toParam} of node {link.to}&nbsp;</span>
              <a href="#" onClick={() => onDeleteClick(link.id, link.from, link.to, link.toParam)}>Delete</a>
            </li>            
          )
        })}    
      </ul>
    </div>
  )
}

export default NodeList;