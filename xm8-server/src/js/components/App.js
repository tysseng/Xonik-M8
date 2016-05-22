import React from 'react'
import { connect } from 'react-redux';
import $ from 'jquery';
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

// TODO: Don't update if net does not validate (or send error message)
const forceUpdate = () => {
  $.ajax({
    url: '/matrix/publish',
    type: 'PUT',
    success: function(response) {
      console.log(response);
    },
    error: function(response) {
      console.log(response.responseText);
    }
  });
}

let App = ({ selectedNode, shouldAutoUpdate, nodes, links, dispatch }) => {  
  return(
  <div>
    <input id="autoUpdate" type="checkbox" checked={shouldAutoUpdate} onChange={(e) => dispatch(toggleAutoUpdate(e.target.checked))}/>
    <label htmlFor="autoUpdate">Auto update synth voice</label><br/>

    <button disabled={shouldAutoUpdate} onClick={forceUpdate}>Update voice</button>

    <NodeList nodes={nodes} onNodeClick={(id) => dispatch(selectNode(id))} onDeleteClick={(id) => dispatch(deleteNode(id))}/>
    <LinkList links={links}/>

    <a href="#" onClick={(e) => { 
      e.preventDefault(); 
      dispatch(createNewNode());
    }}>Add node</a><br/>
    {(() => {
      if(selectedNode && selectedNode !== ""){
        return <NodeFormContainer nodeId={selectedNode}/>
      } 
      return "";
    })()}
  </div>
)}

App = connect(mapStateToProps)(App);

export default App