import nodeTypes from '../../../shared/matrix/NodeTypes.js';

const LinkDialog = ({nodes, linkDialog,  onCancel, onCreate}) => {

  let fromNode = nodes[linkDialog.fromNodeId];
  let toNode = nodes[linkDialog.toNodeId];

  if(!toNode || !fromNode) return null;
  let nodeType = nodeTypes.idMap[toNode.type];

  return ( 
    <div className="linkdialog">
      <div className="modalBox">
        <div className="heading">Connect nodes</div>
        {toNode.type === "-1" && <div>Sorry, you have to select a node type for {toNode.name} before you can connect it to {fromNode.name}</div>}
        {
          toNode.type != '-1' && 
          <div>
            <div>What parameter of {toNode.name} do you want to send the output of {fromNode.name} to?</div>          
            <div className="parameters">          
              {        
                nodeType.params.map((parameterDefinition) => {  
                  return <div className="parameter" onClick={() => onCreate(linkDialog.fromNodeId, linkDialog.toNodeId, parameterDefinition.id)}>{parameterDefinition.name}</div>
                })
              }
            </div>
          </div>
        }
        <div>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default LinkDialog;