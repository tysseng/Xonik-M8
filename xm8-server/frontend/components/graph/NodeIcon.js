let nodeTypesAll = require('../../../shared/graph/NodeTypes.js');
    
const getIcon = (nodeType, x, y) => {

  let nodeTypes = nodeTypesAll.map;
  switch(nodeType.id){
    case nodeTypes.NOT_SELECTED.id:
      return null;
    case nodeTypes.SUM.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Sum</text>;
    case nodeTypes.INVERT.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Inv</text>;
    case nodeTypes.INVERT_EACH_SIDE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Inv 2</text>;
    case nodeTypes.RAMP.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Ramp</text>;
    case nodeTypes.DELAY_LINE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Delay</text>;
    case nodeTypes.MULTIPLY.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>X</text>;
    case nodeTypes.MEMORY.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Memory</text>;
    case nodeTypes.LFO_PULSE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>LFO P</text>;
    case nodeTypes.SWITCH.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Switch</text>;
    case nodeTypes.COMPARE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Comp</text>;
    case nodeTypes.MAX.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Max</text>;
    case nodeTypes.MIN.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Min</text>;
    case nodeTypes.SCALE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Scale</text>;
    case nodeTypes.TRIGGER.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Trigger</text>;
    case nodeTypes.BINARY_AND.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>And</text>;
    case nodeTypes.BINARY_OR.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Or</text>;
    case nodeTypes.BINARY_XOR.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Xor</text>;
    case nodeTypes.BINARY_NOT.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Not</text>;
    case nodeTypes.BUFFER_PARAMETER.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Buffer</text>;
    case nodeTypes.OUTPUT.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Out</text>;
    case nodeTypes.OUTPUT_TUNED.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Out tun</text>;
    case nodeTypes.GLIDE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Glide</text>;
    case nodeTypes.QUANTIZE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Quantize</text>;
    case nodeTypes.POSITIVE_EXPONENTIAL.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Exp</text>;
  }  
}

const NodeIcon = ({node, x, y}) => {

  let nodeType = nodeTypesAll.idMap[node.type];
  return getIcon(nodeType, x, y);
}

export default NodeIcon;