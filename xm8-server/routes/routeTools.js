function sendToAllClients(wss, message){
  wss.clients.forEach(function (client) {
    try{
      console.log("Sending message " + message + " to gui " + client);
      client.send(message);
    } catch (ex){
      console.log("Client went missing before server could send message");
    }
  });
}

module.exports.sendToAllClients = sendToAllClients;