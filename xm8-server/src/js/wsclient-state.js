import config from "./config.js";

let ws;

if ("WebSocket" in window) {
  ws = new WebSocket(config.serverAddr + config.endpoints.state);
  ws.onopen = function(){
    console.log("Connected to state service on XM8 server");
  }
} else {
  throw new Exception("WebSocket not supported by your browser, cannot communicate with Xonik M8 server");
}

export default ws;