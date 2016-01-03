// runs a set of functions and quits the program regardless of how the program flow
// ended

var callbacks =[];
var hasRun = false;

function onExit(callback){
  callbacks.push(callback);
}

function exitHandler(){
  if(hasRun){
    return;
  } else {
    hasRun = true;
  }

  console.log('Cleaning up before exiting program');

  for(var i=0; i<callbacks.length; i++){
    callbacks[i]();
  }
  
  process.exit(1);
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('uncaughtException', exitHandler);

module.exports.onExit = onExit;

