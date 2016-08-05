import nodeTypes from '../../../shared/graph/NodeTypes.js';
import {map as paramTypes} from '../../../shared/graph/ParameterTypes.js';
import ParameterDescription from './ParameterDescription';
import NodeTypeDropdown from './nodeform/NodeTypeDropdown';
import ModalBox from '../framework/ModalBox';     

const isLinkable = (parameterDefinition) => {
  let whitelist = parameterDefinition.typeWhitelist
  let blacklist = parameterDefinition.typeBlacklist

  if(whitelist){
    return _.includes(whitelist, paramTypes.INPUT.id);
  } else if(blacklist){
    return !_.includes(blacklist, paramTypes.INPUT.id);
  } 
  return true;
}

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

                // check that parameter type INPUT is possible for the parameter.
                if(!isLinkable(parameterDefinition)){
                  console.log("not linkable", parameterDefinition)
                  return null;
                }

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