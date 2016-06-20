import MiniIcon from '../framework/MiniIcon';

let nodeTypes = require('../../../shared/matrix/NodeTypes.js').idMap;

const NodeList = ({links, nodes, onLinkClick, onDeleteClick}) => {
  return (
    <div className='configPane linkList'>
      <div className="heading">Links</div>
      <div className="contents">
        <ul>
          {links.map(link => {

            console.log(nodes);

            let fromNode = nodes[link.from];
            let toNode = nodes[link.to];

            return (
              <li key={link.id}>
                <MiniIcon label="Delete" icon="garbage.svg" onClick={() => onDeleteClick(link.id, link.from, link.to, link.toParam)}/>                
                <span onClick={() => onLinkClick(link.id)}>{link.name} - From {fromNode.name} to param {link.toParam} of {toNode.name}&nbsp;</span>                
              </li>            
            )
          })}    
        </ul>
      </div>
    </div>
  )
}

export default NodeList;