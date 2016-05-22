var spiType = require('../spi/spiType.js');

let commandKeys = {
  STOP: 1,
  START: 2, // starts at same position without changing anything
  RESTART: 3 // restarts from node 0 after recalculating matrix  and resetting state
} 

const getBuffer = command => {
  var nodeBuffer = new Buffer(spiType.MATRIX_COMMAND.size);
  nodeBuffer.writeUInt8(spiType.MATRIX_COMMAND.size, 0);
  nodeBuffer.writeUInt8(spiType.MATRIX_COMMAND.id, 1);
  nodeBuffer.writeUInt8(command, 2);

  return nodeBuffer;
}

let matrixCommands = {
  stop: getBuffer(commandKeys.STOP),
  start: getBuffer(commandKeys.START),
  restart: getBuffer(commandKeys.RESTART)
}

module.exports = matrixCommands;