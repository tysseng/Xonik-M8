import _ from 'lodash';
import store from '../../core/state/store.js';
import tools from './routeTools';
import {subscribe} from '../../shared/state/redux-subscribe.js';

// receive actions and send state
export default (app, ws) => {

  var root = "/api/state";

  const sendPartialState = change => {
    /*
    Wrap change in an object tree similar to the state it is part of,
    e.g. state from patches/patch0/graph is put into an object like this:
    {
      patches: {
        patch0: {
          graph: someState
        }
      }
    }
    Doing this makes it possible to use the same reducer for loading complete state
    as partial state

    */
    let state = change.next;
    _.eachRight(change.pathObj.pathElements, pathElement => {
      state = {[pathElement]: state};
    });

    tools.sendToAllClients(ws.getWss(root), null, JSON.stringify(state));
  }

  app.ws(root, function(ws, req) {
    console.log("Something connected to the state websocket service");

    // Send current state to connecting client
    ws.send(JSON.stringify(store.getState()));

    // Setup action reception
    ws.on('message', (msg) => {
      let action = JSON.parse(msg);
      //console.log("Received action from client");
      store.dispatch(action);
    });
  });

  store.dispatch(subscribe('patchview', 'frontend', sendPartialState));
  store.dispatch(subscribe('patches/0/graph', 'frontend', sendPartialState));
  store.dispatch(subscribe('filesystem', 'frontend', sendPartialState));
  store.dispatch(subscribe('patches/0/virtualInputs', 'frontend', sendPartialState));
  store.dispatch(subscribe('physicalInputs', 'frontend', sendPartialState));
  store.dispatch(subscribe('patches/0/matrix', 'frontend', sendPartialState));
  store.dispatch(subscribe('patches/0/inputgroups', 'frontend', sendPartialState));
  store.dispatch(subscribe('controllers/0', 'frontend', sendPartialState));

};
