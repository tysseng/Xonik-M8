import React from 'react'
import NodeFormContainer from './matrix/NodeFormContainer.js'
import NodeList from './matrix/NodeList.js'

let nodes = [{
  type: 2,
  id: 0,
}];

const onNodeClick = (id) => {
  console.log("Someone clicked on node " + id);
}


const App = (props) => {

  return(
  <div>
    {NodeList(nodes, onNodeClick)}
    <NodeFormContainer url='/matrix/node'  nodeId="0" store={props.store}/>
  </div>
)}

export default App