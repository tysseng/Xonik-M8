import _ from 'lodash';
import config from '../../shared/config.js';

import serializer from './serializer.js';
import { prepareNetForSerialization } from './preparer.js';
import printer from './printer.js';

export function serialize(nodes, voiceGroupId){
  var net = prepareNetForSerialization(nodes);
  printer.printNet(net);

  var buffers = [];

  // TODO: Add voiceGroupId as buffer to allow routing on main microcontroller

  // add all constants and constant lengths
  for(var i = 0; i<net.constants.length; i++){
    var serializedConstant = serializer.serializeConstant(i + config.graph.numberOfInputs, net.constants[i]);
    buffers.push(serializedConstant);
  }
  buffers.push(serializer.serializeConstantsCount(net.constants));

  // add all nodes and node array length
  _.each(net.nodes, function(node){
    var serializedNode = serializer.serializeNode(node);
    buffers.push(serializedNode);
  });
  buffers.push(serializer.serializeNodeCount(net.nodes));

  return buffers;
}