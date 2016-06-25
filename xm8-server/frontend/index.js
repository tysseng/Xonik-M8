import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, IndexRoute, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { setState } from '../shared/state/actions';
import remoteActionMiddleware from './remoteActionMiddleware';
import initWsclientForState from './wsclient-state.js';
import guiReducers from './reducers';

import MainMenu from './components/framework/MainMenu';
import MatrixPage from './components/matrix/MatrixPageContainer';
import NotFound from './components/NotFound';
import Network from './components/Network';

import ws from './wsclient-state.js';

ws.onmessage = (msg) => { 
  let state = JSON.parse(msg.data);
  store.dispatch(setState(state));
};

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(ws)
)(createStore);

const store = createStoreWithMiddleware(guiReducers);


const AppWrapper = React.createClass({
  render() {
    return (
      <div>
        <MainMenu/>
        {this.props.children}
      </div>
    )
  }
})

render(
  <Provider store={store}>
    <Router history={browserHistory}>      
      <Route path="/" component={AppWrapper}>
        <IndexRoute component={MatrixPage}/>
        <Route path="home" component={MatrixPage}/>
        <Route path="patches" component={MatrixPage}/>
        <Route path="control" component={NotFound}/>
        <Route path="files" component={NotFound}/>
        <Route path="settings" component={NotFound}/>
        <Route path="network" component={NotFound}/>
        <Route path="trash" component={NotFound}/>
      </Route>    
    </Router>
  </Provider>,
  document.getElementById('content')
);