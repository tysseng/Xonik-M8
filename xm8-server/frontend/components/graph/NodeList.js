import MiniIcon from '../framework/MiniIcon';
import _ from 'lodash';
let nodeTypes = require('../../../shared/graph/NodeTypes.js').idMap;

const NodeList = ({nodes, onNodeClick, onDeleteClick}) => {
  return (
    <div className='configPane nodeList'>
      <div className="heading">Nodes</div>
      <div className="contents">
        <ul>
          {Object.values(nodes).map(node => {
            let nodeTypeDefinition = nodeTypes[node.type];
            let type = nodeTypeDefinition ? nodeTypeDefinition.name : "Type not selected";

            let color = node.valid ? {} : {color: '#ff0000'};
            return (
              <li key={node.id}>
                <MiniIcon label="Delete" icon="garbage.svg" onClick={() => onDeleteClick(node.id)}/>
                <div className='nodedescription' onClick={() => onNodeClick(node.id)}>
                  <div className='name'>{node.name}</div>
                  <div className='value'>{type} {!node.valid && <span className='invalid'> (incomplete)</span>}</div>
                </div>
              </li>
            )
          })}    
        </ul>
      </div>
    </div>
  )
}

export default NodeList;