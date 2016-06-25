import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { setState } from '../shared/state/actions';
import remoteActionMiddleware from './remoteActionMiddleware';
import initWsclientForState from './wsclient-state.js';
import guiReducers from './reducers';

import App from './components/App';
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

render(
  <div>
    <Provider store={store}>
      <Router history={browserHistory}>
        <Route path="/" component={App}>
          <Route path="about" component={App}/>
          <Route path="*" component={NotFound}/>
        </Route>
      </Router>      
    </Provider>
  </div>,
  document.getElementById('content')
);