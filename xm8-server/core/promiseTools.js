var execAsync = require('child_process').exec;

function exec(command, logMsg, errorMsg, ignoreError){
   var promise = new Promise(function(resolve, reject){
    console.log(logMsg);
    execAsync(command, function (error, stdout, stderr){
      if(!error || ignoreError){
        console.log("Command succeded");
        console.log(stdout);
        resolve(stdout);
      } else {
        console.log("Command failed");
        console.log(stderr);
        reject({message: errorMsg, stdout: stdout, stderr: stderr, error: error});
      }
    });
  });
  return promise; 
}

function delay(ms){
  return new Promise(function(resolve, reject){
    setTimeout(resolve, ms);
  });
}

module.exports.exec = exec;
module.exports.delay = delay;