import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import xm8App from './reducers'
import App from './components/App'

let store = createStore(xm8App);
render(
  <Provider store={store}>
    <App store={store} fish="234"/>
  </Provider>,
  document.getElementById('content')
);