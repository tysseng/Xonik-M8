import React from 'react'
import { connect } from 'react-redux';
import $ from 'jquery';
import NodeFormContainer from './matrix/NodeFormContainer.js'
import LinkFormContainer from './matrix/LinkFormContainer.js'
import PatchFileDialogContainer from './filesystem/PatchFileDialogContainer';
import NodeList from './matrix/NodeList.js'
import LinkList from './matrix/LinkList.js'
import { selectNode, selectLink, createNewNode, deleteNode, deleteLink, toggleAutoUpdate, togglePatchFileDialog } from '../../shared/state/actions';
import { toggleFileDialog } from '../../shared/state/actions/filedialog';
import paramTypes from '../../shared/matrix/ParameterTypes.js';

const isLink = (type) => {
  return type === paramTypes.map.LINK.id;
}

const mapStateToProps = (state, ownProps) => {
  let nodes = state.nodes.toIndexedSeq().toJS();

  let links = [];
  _.each(nodes, node => {
    _.each(node.params, param => {
      if(isLink(param.type) && param.value && param.value !== ""){
        links.push(param.value);
      }
    });
  });

  //let links = state.links.toIndexedSeq().toJS();
  let selectedNode = state.matrix.get('selectedNode');
  let selectedLink = state.matrix.get('selectedLink');
  let shouldAutoUpdate = state.matrix.get('shouldAutoUpdate');
  let showFileDialog = state.filedialog.get('show');
  return {
    links,
    nodes,
    selectedNode,
    selectedLink,
    shouldAutoUpdate,
    showFileDialog
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPatchSave: () => {
      dispatch(toggleFileDialog(true, 'save'));
    },
    onPatchSaveAs: () => {
      dispatch(toggleFileDialog(true, 'saveas'));
    },
    onPatchLoad: () => { 
      dispatch(toggleFileDialog(true, 'load'));
    },
    onCreateNewNode: () => {
      dispatch(createNewNode());
    }
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

let App = ({ 
  selectedNode, selectedLink, shouldAutoUpdate, nodes, links, showFileDialog, 
  onCreateNewNode, onPatchSave, onPatchSaveAs, onPatchLoad 
}) => {

  // TODO: Do this better!
  let patchFileDialog;
  if(showFileDialog){
    patchFileDialog = <PatchFileDialogContainer/>;
  } 

  return(
  <div>
    <input id="autoUpdate" type="checkbox" checked={shouldAutoUpdate} onChange={(e) => dispatch(toggleAutoUpdate(e.target.checked))}/>
    <label htmlFor="autoUpdate">Auto update synth voice</label><br/>

    <button disabled={shouldAutoUpdate} onClick={forceUpdate}>Update voice</button>
    <button onClick={onPatchSave}>Save</button>
    <button onClick={onPatchSaveAs}>Save as</button>
    <button onClick={onPatchLoad}>Load</button>

    {patchFileDialog}

    <NodeList nodes={nodes} onNodeClick={(id) => dispatch(selectNode(id))} onDeleteClick={(id) => dispatch(deleteNode(id))}/>
    <LinkList links={links} onLinkClick={(id) => dispatch(selectLink(id))} onDeleteClick={(id, from, to, param) => dispatch(deleteLink(id, from, to, param))}/>

    <a href="#" onClick={(e) => { 
      e.preventDefault(); 
      onCreateNewNode();
      
    }}>Add node</a><br/>

    {(() => {
      if(selectedNode && selectedNode !== ""){
        return <NodeFormContainer nodeId={selectedNode}/>
      } 
      return "";
    })()}

    {(() => {
      if(selectedLink && selectedLink !== ""){
        return <LinkFormContainer linkId={selectedLink}/>
      } 
      return "";
    })()}    
  </div>
)}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App