function sendToAllClients(wss, source, message){

  wss.clients.forEach(function (client) {
    try{
      if(client === source){
        console.log("Not sending message back to its origin");
      } else {
        client.send(message);        
      }
    } catch (ex){
      console.log("Client went missing before server could send message");
    }
  });
}

module.exports.sendToAllClients = sendToAllClients;
