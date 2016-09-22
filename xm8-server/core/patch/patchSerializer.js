import _ from 'lodash';
import config from '../../shared/config.js';

import {
  serializeConstant, serializeConstantsCount,
  serializeNode, serializeNodeCount,
  serializeVoiceGroupId} from './serializer.js';
import { prepareNetForSerialization } from './preparer.js';
import printer from './printer.js';

/*

Serialization:
- Must leave room for virtual inputs in results array map.
- Only used virtual inputs should be added
- Must add a mapping to virtual inputs to be kept on server, needed when a virtual input changes to map to correct
  position in the results array
- Must add function that sends virtual inputs. Should use mapping. Must include voice group
- Must add function that sends physical inputs. Must include voice group

- Must send virtual inputs config to server - per voice - midi messages to listen to - must update config on MCU

- Must send physical inputs config to server - midi messages to listen to on MCU

- Must send matrix/direct connections

 */
export function serialize(nodes, voiceGroupId){
  var net = prepareNetForSerialization(nodes);
  printer.printNet(net);

  var buffers = [];

  buffers.push(serializeVoiceGroupId(voiceGroupId));

  // add all constants and constant lengths
  for(var i = 0; i<net.constants.length; i++){
    var serializedConstant = serializeConstant(i + config.graph.numberOfInputs, net.constants[i]);
    buffers.push(serializedConstant);
  }
  buffers.push(serializeConstantsCount(net.constants));

  // add all nodes and node array length
  _.each(net.nodes, function(node){
    var serializedNode = serializeNode(node);
    buffers.push(serializedNode);
  });
  buffers.push(serializeNodeCount(net.nodes));

  return buffers;
}