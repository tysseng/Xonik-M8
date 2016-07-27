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

import HomePage from './components/home/HomePage';
import GraphPage from './components/graph/GraphPageContainer';
import MatrixPage from './components/matrix/MatrixPage';
import ControlPage from './components/control/ControlPage';
import FilesPage from './components/files/FilesPage';
import SettingsPage from './components/settings/SettingsPage';
import InputsPage from './components/inputs/InputsPage';
import InputGroupsPage from './components/inputgroups/InputGroupsPage';
import NetworkPage from './components/network/NetworkPage';
import TrashPage from './components/trash/TrashPage';


import NotFound from './components/NotFound';

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
        <svg height='0' width='0'>
          <filter id="drop-shadow"  x="-30%" y="-30%" width="150%" height="150%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="blur"/>
            <feColorMatrix result="bluralpha" type="matrix" values=
                    "1 0 0 0   0
                     0 1 0 0   0
                     0 0 1 0   0
                     0 0 0 0.9 0 "/>
            <feOffset in="bluralpha" dx="1" dy="1" result="offsetBlur"/>
            <feMerge>
              <feMergeNode in="offsetBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>        
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>        
        </svg>            
      </div>
    )
  }
})

//BrowserHistory.listen(location => dispatch(routeLocationDidUpdate(location)));
//http://stackoverflow.com/questions/31268740/firing-redux-actions-in-response-to-route-transitions-in-react-router

render(
  <Provider store={store}>
    <Router history={browserHistory}>      
      <Route path="/" component={AppWrapper}>
        <IndexRoute component={GraphPage}/>
        <Route path="home" component={HomePage}/>
        <Route path="patches" component={GraphPage}/>
        <Route path="matrix" component={MatrixPage}/>        
        <Route path="control" component={ControlPage}/>
        <Route path="files" component={FilesPage}/>
        <Route path="settings" component={SettingsPage}/>
        <Route path="inputs" component={InputsPage}/>
        <Route path="inputgroups" component={InputGroupsPage}/>
        <Route path="network" component={NetworkPage}/>
        <Route path="trash" component={TrashPage}/>
        <Route path="*" component={NotFound}/>        
      </Route>    
    </Router>
  </Provider>,
  document.getElementById('content')
);