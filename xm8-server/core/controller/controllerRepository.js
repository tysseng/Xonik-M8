// the spi repository serializes, sends and receives data through the SPI bus. 
// It communicates through events and exports nothing.

import eventbus from '../eventbus.js';
import spi from '../spi/spi-fd.js';
import config from '../../shared/config.js';
import ctrlConfig from '../../shared/controllerSetup.js';
import spiType from '../spi/spiType.js';
import serializer from './serializer.js';

import changeTracker from '../state/controllersChangeTracker';
import { initPatchAutosaver } from '../autosave/autosaver';
import { getControllers} from '../state/selectors';

export const autosaver = initPatchAutosaver(changeTracker, getControllers, config.persistence.autosave.controllers.file);

function publishControllerChange(buffer){
  var event = serializer.deserializeController(buffer, this);

  if(event.type === spiType.CTRL_8_BIT || event.type === spiType.CTRL_16_BIT){
    eventbus.controls.emit("controller", event);
    console.log("Published event from SPI: " + event.id + " to " + event.value);    
  }
}

function listenToControllerChanges(){
  eventbus.controls.on("controller",function(event){
    if(event.sourceType !== "spi"){
      sendController(serializer.serializeController(event));
    }
  });
}

function sendController(buffer){
  if(config.spi.loopback){
    console.log("SPI loopback, resending");
    console.log(buffer);
    publishControllerChange(buffer);  	
  } else {
    spi.write(buffer);
  }
}

function receive(buffer){
  //Todo - implement multiple types here. For now controller messages are the only ones.
  publishControllerChange(buffer);
}
/*
listenToControllerChanges();
spi.onRead(receive);*/
