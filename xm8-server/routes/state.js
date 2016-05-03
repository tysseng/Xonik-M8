import store from '../state/store.js';
import tools from './routeTools';

// receive actions and send state
export default (app, ws) => {

  var root = "/state";

  app.ws(root, function(ws, req) {
    console.log("Something connected to the state websocket service");

    ws.on('message', (msg) => {
      let action = JSON.parse(msg);
      console.log("Received action from client");
      console.log(action);
      store.dispatch(action);
    });
  });

  store.subscribe(
    () => {
      console.log("Sending updated state to clients");
      console.log(JSON.stringify(store.getState()));

      tools.sendToAllClients(ws.getWss(root), null, JSON.stringify(store.getState()));      
    }
  );
};
