import React from 'react'
import { connect } from 'react-redux';

import NodeFormContainer from './matrix/NodeFormContainer.js'
import NodeList from './matrix/NodeList.js'
import { selectNode, createNewNode, deleteNode, toggleAutoUpdate } from '../../../shared/state/actions';

const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toIndexedSeq().toJS();
  let selectedNode = state.matrix.get("selectedNode");
  let shouldAutoUpdate = state.matrix.get("shouldAutoUpdate");
  return {
    nodes,
    selectedNode,
    shouldAutoUpdate
  }
}

let App = ({ selectedNode, shouldAutoUpdate, nodes, dispatch }) => {
  return(
  <div>
    <input id="autoUpdate" type="checkbox" checked={shouldAutoUpdate} onChange={(e) => dispatch(toggleAutoUpdate(e.target.checked))}/>
    <label htmlFor="autoUpdate">Auto save to synth</label><br/>

    <NodeList nodes={nodes} onNodeClick={(id) => dispatch(selectNode(id))} onDeleteClick={(id) => dispatch(deleteNode(id))}/>
    <a href="#" onClick={(e) => { 
      e.preventDefault(); 
      dispatch(createNewNode());
    }}>Add node</a><br/>
    {(() => {
      if(selectedNode !== ""){
        return <NodeFormContainer url='/matrix/node'  nodeId={selectedNode}/>
      } 
      return "";
    })()}
  </div>
)}

App = connect(mapStateToProps)(App);

export default App