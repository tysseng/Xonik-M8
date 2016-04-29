import { combineReducers } from 'redux';
import nodes from './nodes';
import matrix from './matrix';

const xm8App = combineReducers({
  nodes,
  matrix
});

export default xm8App;