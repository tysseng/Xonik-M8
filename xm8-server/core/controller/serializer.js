var spiType = require('../spi/spiType.js');

function serializeController(event){
  var controller = ctrlConfig.srv[event.id];
  var type = controller.type;
  var id = controller.hwId;
  switch(type){
    case spiType.CTRL_8_BIT.id:
      var buffer = new Buffer(spiType.CTRL_8_BIT.size);
      buffer.writeUInt8(spiType.CTRL_8_BIT.size, 0);
      buffer.writeUInt8(spiType.CTRL_8_BIT.id, 1);
      buffer.writeInt8(event.value);
      return buffer;
    case spiType.CTRL_16_BIT.id:
      var buffer = new Buffer(spiType.CTRL_16_BIT.size);
      buffer.writeUInt8(spiType.CTRL_16_BIT.size, 0);
      buffer.writeUInt8(spiType.CTRL_16_BIT.id, 1);
      buffer.writeInt16(event.value);
      return buffer;
    default:
      return 0; 
  }
}

function deserializeController(buffer, source){
  var controller = {
    sourceType: "spi",
    source: source
  };

  controller.type = buffer.readUInt8(1);

  var controllerConfig = ctrlConfig.hw[controller.type]; 
  if(controllerConfig)
    controller.id = controllerConfig.srvId;

    switch(controller.type){
      case spiType.CTRL_8_BIT.id:
        controller.value = buffer.readInt8(2);
        break;
      case spiType.CTRL_16_BIT.id:
        controller.value = buffer.readInt16(2);
        break;
    }  
  } else {
    controller.type = spiType.UNKNOWN.id;
    controller.value = -1;
    controller.id = -1;
  }

  return controller;
}