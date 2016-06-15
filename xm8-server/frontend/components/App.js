import React from 'react'
import { connect } from 'react-redux';

import MainMenu from './framework/MainMenu';
import MatrixMainContainer from './matrix/MatrixMainContainer';

let App = () => {
  return(
  <div>
    <MainMenu/>
    <MatrixMainContainer/>
  </div>
)}

export default App;