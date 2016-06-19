import nodeTypes from '../../../shared/matrix/NodeTypes.js';
import ParameterDescription from './ParameterDescription';
import NodeTypeDropdown from './NodeTypeDropdown';
import ModalBox from '../framework/ModalBox';     

const LinkDialog = ({nodes, linkDialog,  onCancel, onCreate, onNodeTypeChange}) => {

  let fromNode = nodes[linkDialog.fromNodeId];
  let toNode = nodes[linkDialog.toNodeId];

  if(!toNode || !fromNode) return null;
  let nodeType = nodeTypes.idMap[toNode.type];


  return ( 
    <ModalBox heading='Connect nodes' boxClass='linkdialog'>
      {toNode.type === "-1" && 
        <div>
          <div className="intro">Before linking {fromNode.name} and {toNode.name} you have to select the type for {toNode.name}. What do you want it to be?</div>
          <div>
            <NodeTypeDropdown id="nodeType" value={toNode.type} 
              onNodeTypeChange={
                (typeId) => { 
                  onNodeTypeChange(toNode.id, typeId);
                }
            }/>
          </div>
        </div>
      }
      {
        toNode.type != '-1' && 
        <div>
          <div className="intro">What parameter of {toNode.name} do you want to send the output of {fromNode.name} to?</div>          
          <div className="parameters">          
            {        
              nodeType.params.map((parameterDefinition) => { 
                let paramId = parameterDefinition.id;
                let name = parameterDefinition.name;                
                let parameter = toNode.params[paramId];                 
                return (
                  <div className="parameter" onClick={() => onCreate(linkDialog.fromNodeId, linkDialog.toNodeId, parameterDefinition.id)}>
                    <ParameterDescription name={name} parameter={parameter} nodes={nodes} userClassName='button'/>
                  </div>
                ) 
              })
            }
          </div>
        </div>
      }
      <div>
        <button type="button" onClick={onCancel}>Cancel</button>
      </div>
    </ModalBox>
  )
}

export default LinkDialog;