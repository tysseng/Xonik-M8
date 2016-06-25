import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';
import App from './App';
import NotFound from './NotFound';


// Declarative route configuration (could also load this config lazily
// instead, all you really need is a single root route, you don't need to
// colocate the entire config).
return (
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="about" component={App}/>
      <Route path="*" component={NotFound}/>
    </Route>
  </Router>)