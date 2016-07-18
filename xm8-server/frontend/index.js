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
import ControlPage from './components/control/ControlPage';
import FilesPage from './components/files/FilesPage';
import SettingsPage from './components/settings/SettingsPage';
import InputsPage from './components/inputs/InputsPage';
import InputGroupsPage from './components/inputgrid/InputGroupsPage';
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