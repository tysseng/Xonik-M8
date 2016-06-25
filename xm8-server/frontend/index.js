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

import App from './components/App';
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
        {/* change the <a>s to <Link>s */}
        <ul>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/inbox">Inbox</Link></li>
        </ul>

        {/*
          next we replace `<Child>` with `this.props.children`
          the router will figure out the children for us
        */}
        {this.props.children}
      </div>
    )
  }
})

render(
  <Provider store={store}>
    <Router history={browserHistory}>      
      <Route path="/" component={AppWrapper}>
        <IndexRoute component={App}/>
        <Route path="about" component={App}/>
        <Route path="inbox" component={NotFound}/>
      </Route>    
    </Router>
  </Provider>,
  document.getElementById('content')
);