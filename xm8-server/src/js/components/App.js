import React from 'react'
import { connect } from 'react-redux';

import NodeFormContainer from './matrix/NodeFormContainer.js'
import NodeList from './matrix/NodeList.js'
import LinkList from './matrix/LinkList.js'
import { selectNode, createNewNode, deleteNode, toggleAutoUpdate } from '../../../shared/state/actions';

const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toIndexedSeq().toJS();
  let links = state.links.toIndexedSeq().toJS();
  let selectedNode = state.matrix.get("selectedNode");
  let shouldAutoUpdate = state.matrix.get("shouldAutoUpdate");
  return {
    links,
    nodes,
    selectedNode,
    shouldAutoUpdate
  }
}

let App = ({ selectedNode, shouldAutoUpdate, nodes, links, dispatch }) => {
  console.log(links)
  return(
  <div>
    <input id="autoUpdate" type="checkbox" checked={shouldAutoUpdate} onChange={(e) => dispatch(toggleAutoUpdate(e.target.checked))}/>
    <label htmlFor="autoUpdate">Auto save to synth</label><br/>

    <NodeList nodes={nodes} onNodeClick={(id) => dispatch(selectNode(id))} onDeleteClick={(id) => dispatch(deleteNode(id))}/>
    <LinkList links={links}/>

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