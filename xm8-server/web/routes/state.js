import store from '../../core/state/store.js';
import tools from './routeTools';
import matrixRepository from '../../core/matrix/matrixRepository';

// receive actions and send state
export default (app, ws) => {

  var root = "/state";

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

  // Send state updates to all clients whenever state changes.
  store.subscribe(
    () => {
      //console.log("Sending updated state to clients");
      console.log(JSON.stringify(store.getState().nodes, null, 2));  
      tools.sendToAllClients(ws.getWss(root), null, JSON.stringify(store.getState()));
    }
  );


};
