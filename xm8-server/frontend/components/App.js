import React from 'react'
import { connect } from 'react-redux';

import MainMenu from './framework/MainMenu';
import MatrixMain from './matrix/MatrixMain';

let App = () => {
  return(
  <div>
    <MainMenu/>
    <MatrixMain/>
  </div>
)}

export default App;