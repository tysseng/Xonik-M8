import store from '../../core/state/store.js';
import tools from './routeTools';
import matrixRepository from '../../core/matrix/matrixRepository';
import {subscribe} from '../../shared/state/redux-subscribe.js';

// receive actions and send state
export default (app, ws) => {

  var root = "/api/state";

  const sendPartialState = change => {
      //console.log(JSON.stringify(change.next, null, 2));  

      let fullState = {[change.path]: change.next};

      tools.sendToAllClients(ws.getWss(root), null, JSON.stringify(fullState));
    }

  app.ws(root, function(ws, req) {
    console.log("Something connected to the state websocket service");

    // Send current state to connecting client
    ws.send(JSON.stringify(store.getState()));

    // Setup action reception
    ws.on('message', (msg) => {
      let action = JSON.parse(msg);
      //console.log("Received action from client");
      //console.log(action);
      store.dispatch(action);
    });
  });

  store.dispatch(subscribe('nodes', 'frontend', sendPartialState));
  store.dispatch(subscribe('matrix', 'frontend', sendPartialState));
  store.dispatch(subscribe('filesystem', 'frontend', sendPartialState));
  store.dispatch(subscribe('inputs', 'frontend', sendPartialState));
  store.dispatch(subscribe('inputgrid', 'frontend', sendPartialState));
  store.dispatch(subscribe('controllers', 'frontend', sendPartialState));

  // Send state updates to all clients whenever state changes.
  /*store.subscribe(
    () => {
      //console.log("Sending updated state to clients");
      console.log(JSON.stringify(store.getState().nodes, null, 2));  
      tools.sendToAllClients(ws.getWss(root), null, JSON.stringify(store.getState()));
    }
  );*/

};
