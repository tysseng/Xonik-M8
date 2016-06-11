import React from 'react'
import { connect } from 'react-redux';

import PatchFileDialogContainer from './filesystem/PatchFileDialogContainer';
import MainMenu from './framework/MainMenu';
import MatrixMain from './matrix/MatrixMain';

const mapStateToProps = (state, ownProps) => {
  let showFileDialog = state.filedialog.get('show');

  return {
    showFileDialog
  }
}

let App = ({ 
  showFileDialog 
}) => {

  // TODO: Do this better!
  // TODO: Move to matrix page.
  let patchFileDialog;
  if(showFileDialog){
    patchFileDialog = <PatchFileDialogContainer path='/patches'/>;
  } 

  return(
  <div>
    <MainMenu/>
    <MatrixMain/>
    {patchFileDialog}
  </div>
)}

//TODO: Remove
const mapDispatchToProps = () => {
  return {}
}

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;