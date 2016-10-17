import { nodeTypesById } from '../../../shared/graph/NodeTypes';
    
const getIcon = (nodeType, x, y) => {

  switch(nodeType.id){
    case nodeTypesById.NOT_SELECTED.id:
      return null;
    case nodeTypesById.SUM.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Sum</text>;
    case nodeTypesById.INVERT.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Inv</text>;
    case nodeTypesById.INVERT_EACH_SIDE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Inv 2</text>;
    case nodeTypesById.RAMP.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Ramp</text>;
    case nodeTypesById.DELAY_LINE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Delay</text>;
    case nodeTypesById.MULTIPLY.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>X</text>;
    case nodeTypesById.MEMORY.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Memory</text>;
    case nodeTypesById.LFO_PULSE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>LFO P</text>;
    case nodeTypesById.SWITCH.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Switch</text>;
    case nodeTypesById.COMPARE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Comp</text>;
    case nodeTypesById.MAX.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Max</text>;
    case nodeTypesById.MIN.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Min</text>;
    case nodeTypesById.SCALE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Scale</text>;
    case nodeTypesById.TRIGGER.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Trigger</text>;
    case nodeTypesById.BINARY_AND.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>And</text>;
    case nodeTypesById.BINARY_OR.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Or</text>;
    case nodeTypesById.BINARY_XOR.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Xor</text>;
    case nodeTypesById.BINARY_NOT.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Not</text>;
    case nodeTypesById.BUFFER_PARAMETER.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Buffer</text>;
    case nodeTypesById.OUTPUT.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Out</text>;
    case nodeTypesById.OUTPUT_TUNED.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Out tun</text>;
    case nodeTypesById.GLIDE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Glide</text>;
    case nodeTypesById.QUANTIZE.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Quantize</text>;
    case nodeTypesById.POSITIVE_EXPONENTIAL.id:
      return <text textAnchor="middle" className='nodeicon' x={x} y={y}>Exp</text>;
  }  
}

const NodeIcon = ({node, x, y}) => {
  let nodeType = nodeTypesById[node.type];
  return getIcon(nodeType, x, y);
}

export default NodeIcon;