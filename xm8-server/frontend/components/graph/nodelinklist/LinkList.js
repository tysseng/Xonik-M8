import MiniIcon from '../../framework/MiniIcon';
import LinkDescription from '../linkform/LinkDescription';
import paramTypes from '../../../../shared/graph/ParameterTypes';

const NodeList = ({links, nodes, onLinkClick, onDeleteClick}) => {
  return (
    <div className='configPane linkList'>
      <div className="heading">Links</div>
      <div className="contents">
        <ul>
          {links.map(link => {
            return (
              <li key={link.id}>
                <MiniIcon label="Delete" icon="garbage.svg" onClick={() => onDeleteClick(link.id, link.from, link.to, link.toParam)}/>  
                <div className='link' onClick={() => onLinkClick(link.id)}> 
                  <LinkDescription link={link} nodes={nodes}/>
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