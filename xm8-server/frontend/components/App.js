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

  let selectedFileDetails = {
    selectedFileId: state.matrix.getIn(['patch','fileId']),
    selectedFileVersion: state.matrix.getIn(['patch', 'version']),
  }

  return {
    links,
    nodes,
    selectedNode,
    selectedLink,
    selectedFileDetails,
    shouldAutoUpdate,
    showFileDialog
  }
}


const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onPatchSave: (options) => dispatch(toggleFileDialog(true, 'save', options)),
    onPatchSaveAs: (options) => dispatch(toggleFileDialog(true, 'saveas', options)),
    onPatchLoad: () => dispatch(toggleFileDialog(true, 'load')),
    onCreateNewNode: () => dispatch(createNewNode()),
    
    onNodeClick: (id) => dispatch(selectNode(id)),
    onLinkClick: (id) => dispatch(selectLink(id)),
    onNodeDeleteClick: (id) => dispatch(deleteNode(id)),
    onLinkDeleteClick: (id, from, to, param) => dispatch(deleteLink(id, from, to, param))
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
  selectedNode, selectedLink, shouldAutoUpdate, nodes, links, showFileDialog, selectedFileDetails,
  onCreateNewNode, onPatchSave, onPatchSaveAs, onPatchLoad,
  onNodeClick, onLinkClick, onNodeDeleteClick, onLinkDeleteClick 
}) => {

  // TODO: Do this better!
  let patchFileDialog;
  if(showFileDialog){
    patchFileDialog = <PatchFileDialogContainer path='/patches'/>;
  } 

  return(
  <div>
    <input id="autoUpdate" type="checkbox" checked={shouldAutoUpdate} onChange={(e) => dispatch(toggleAutoUpdate(e.target.checked))}/>
    <label htmlFor="autoUpdate">Auto update synth voice</label><br/>

    <button disabled={shouldAutoUpdate} onClick={forceUpdate}>Update voice</button>
    <button onClick={() => onPatchSave(selectedFileDetails)}>Save</button>
    <button onClick={() => onPatchSaveAs(selectedFileDetails)}>Save as</button>
    <button onClick={onPatchLoad}>Load</button>

    {patchFileDialog}

    <NodeList nodes={nodes} onNodeClick={onNodeClick} onDeleteClick={onNodeDeleteClick}/>
    <LinkList links={links} onLinkClick={onLinkClick} onDeleteClick={onLinkDeleteClick}/>

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