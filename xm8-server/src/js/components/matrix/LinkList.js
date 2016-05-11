import React from 'react';
import $  from 'jquery';

let nodeTypes = require('../../../../shared/matrix/NodeTypes.js').idMap;

const NodeList = ({links}) => {
  return (
    <div>
      <h3>Links</h3>
      <ul>
        {links.map(link => {
          return (
              <li key={link.id} >From node {link.from} to param {link.toParam} of node {link.to}</li>
          )
        })}    
      </ul>
    </div>
  )
}

export default NodeList;