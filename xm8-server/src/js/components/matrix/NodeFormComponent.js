import React from 'react'
import _ from 'lodash';
import NodeTypeDropdown from './NodeTypeDropdown.js'

const NodeFormComponent = ({ nodeTypeId, nodeId, onNodeTypeChange }) => (
  <form>
    <h3>General</h3>
    <p>
      <label htmlFor="nodeType">Node type</label>          
      <NodeTypeDropdown id="nodeType" nodeTypeId={nodeTypeId} 
        onNodeTypeChange={
          (typeId) => { 
            onNodeTypeChange(nodeId, typeId);
          }
      }/>
    </p>
  </form>
)

export default NodeFormComponent;