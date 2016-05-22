var paramType = require('../../shared/matrix/ParameterTypes.js').map;
var nodeType = require('./../shared/matrix/NodeTypes.js').map;

function output(source, outputNum){
  var node = {
    type: nodeType.OUTPUT.id,
    params: [
      {
        value: (source ? source[0] : 0),
        type: (source ? source[1] : paramType.UNUSED.id),
        label: "Source"
      },
      {
        value: (outputNum ? outputNum[0] : 0),
        type: (outputNum ? outputNum[1] : paramType.UNUSED.id),
        label: "Output number"
      }
    ],
    paramsInUse: 2,
    consumers: [] // all nodes that use the output of this node
  }
  return node;
}

function invert(source){
  var node = {
    type: nodeType.INVERT.id,
    params: [
      {
        value: (source ? source[0] : 0),
        type: (source ? source[1] : paramType.UNUSED.id),
        label: "Source"
      }
    ],
    paramsInUse: 1,
    consumers: [] // all nodes that use the output of this node
  }
  return node;
}


function lfoPulse(cyclelength, pulsewidth, trigger, positive, negative){
  var node = {
    type: nodeType.LFO_PULSE.id,
    params: [
      {
        value: (cyclelength ? cyclelength[0] : 0),
        type: (cyclelength ? cyclelength[1] : paramType.UNUSED.id),
        label: "Cycle length"
      },
      {
        value: (pulsewidth ? pulsewidth[0] : 0),
        type: (pulsewidth ? pulsewidth[1] : paramType.UNUSED.id),
        label: "Pulse width"
      },
      {
        value: (trigger ? trigger[0] : 0),
        type: (trigger ? trigger[1] : paramType.UNUSED.id),
        label: "trigger"
      },
      {
        value: (positive ? positive[0] : 0),
        type: (positive ? positive[1] : paramType.UNUSED.id),
        label: "positive"
      },
      {
        value: (negative ? negative[0] : 0),
        type: (negative ? negative[1] : paramType.UNUSED.id),
        label: "negative"
      }
    ],
    paramsInUse: 5,
    consumers: [] // all nodes that use the output of this node
  }
  return node;
}

module.exports.output = output;
module.exports.invert = invert;
module.exports.lfoPulse = lfoPulse;