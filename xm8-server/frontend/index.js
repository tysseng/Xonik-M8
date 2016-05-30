import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { setState } from '../shared/state/actions';
import remoteActionMiddleware from './remoteActionMiddleware';
import initWsclientForState from './wsclient-state.js';
import guiReducers from './reducers';

import App from './components/App';
import FolderListContainer from './components/filesystem/FolderListContainer';

import ws from './wsclient-state.js';

ws.onmessage = (msg) => { 
  let state = JSON.parse(msg.data);
  store.dispatch(setState(state));
};

const createStoreWithMiddleware = applyMiddleware(
  remoteActionMiddleware(ws)
)(createStore);

const store = createStoreWithMiddleware(guiReducers);

/*
render(
  <Provider store={store}>
    <App/>
  </Provider>,
  document.getElementById('content')
);*/

render(
  <div>
  <Provider store={store}>
    <App/>
  </Provider>
  <Provider store={store}>
    <FolderListContainer/>
  </Provider>
  </div>,
  document.getElementById('content')
);