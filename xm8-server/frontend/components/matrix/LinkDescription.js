let nodeTypes = require('../../../shared/matrix/NodeTypes.js').idMap;

const LinkDescription = ({link, nodes}) => {

  let fromNode = nodes[link.from];
  let toNode = nodes[link.to];
  let toParam = nodeTypes[toNode.type].params[link.toParam];
  let linkName = link.name ? link.name : toNode.name + ' ' + toParam.name.toLowerCase();

  return (
    <div className='linkdescription'> 
      <div className='name'>{linkName}</div>
      <div className='value'>From {fromNode.name} to {toParam.name.toLowerCase()} of {toNode.name}</div>
    </div>
  )
}

export default LinkDescription;