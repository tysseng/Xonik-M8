function sendToAllClients(wss, message){

  //TODO: Sjekk om client === message.source!
  wss.clients.forEach(function (client) {
    console.log(client);
    try{
      if(client === message.source){
        console.log("Not sending message back to its origin");
      } else {
        console.log("Sending message " + message + " to gui " + client);    
        client.send(message);        
      }
    } catch (ex){
      console.log("Client went missing before server could send message");
    }
  });
}

module.exports.sendToAllClients = sendToAllClients;
