// runs a set of functions and quits the program regardless of how the program flow
// ended
// TODO: discriminate between various exit reasons and set appropriate exit code
var callbacks =[];
var hasRun = false;

function onExit(callback){
  callbacks.push(callback);
}

function cleanup(){
  if(hasRun){
    return;
  } else {
    hasRun = true;
  }

  console.log('Cleaning up before exiting program');

  for(var i=0; i<callbacks.length; i++){
    callbacks[i]();
  }
  
  process.exit();
}

function exitHandler(){
  cleanup();
  process.exit();
}

function uncaughtExExitHandler(err){
  console.log(err);
  cleanup();
  throw err;
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('uncaughtException', uncaughtExExitHandler);

module.exports.onExit = onExit;

