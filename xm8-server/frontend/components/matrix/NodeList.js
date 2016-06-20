import MiniIcon from '../framework/MiniIcon';
import _ from 'lodash';
let nodeTypes = require('../../../shared/matrix/NodeTypes.js').idMap;

const NodeList = ({nodes, onNodeClick, onDeleteClick}) => {
  return (
    <div className='configPane nodeList'>
      <div className="heading">Nodes</div>
      <div className="contents">
        <ul>
          {Object.values(nodes).map(node => {
            let nodeTypeDefinition = nodeTypes[node.type];
            let type = nodeTypeDefinition ? "(" + nodeTypeDefinition.name + ")": "(Type not selected)";
            let color = node.valid ? {} : {color: '#ff0000'};
            return (
              <li key={node.id}>
                <MiniIcon label="Delete" icon="garbage.svg" onClick={() => onDeleteClick(node.id)}/>
                <span onClick={() => onNodeClick(node.id)}>{node.name} {type} {!node.valid && <span className='invalid'> (!)</span>} </span>                
              </li>
            )
          })}    
        </ul>
      </div>
    </div>
  )
}

export default NodeList;