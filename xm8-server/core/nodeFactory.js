var paramType = require('./paramType.js');
var nodeType = require('./nodeType.js');

function output(source, outputNum){
  var node = {
    type: nodeType.NODE_OUTPUT,
    params: [
      {
        value: (source ? source[0] : 0),
        type: (source ? source[1] : paramType.EMPTY),
        label: "Source"
      },
      {
        value: (outputNum ? outputNum[0] : 0),
        type: (outputNum ? outputNum[1] : paramType.EMPTY),
        label: "Output number"
      }
    ],
    consumers: [], // all nodes that use the output of this node
    tmp: {}
  }
  return node;
}

function invert(source){
  var node = {
    type: nodeType.NODE_INVERT,
    params: [
      {
        value: (source ? source[0] : 0),
        type: (source ? source[1] : paramType.EMPTY),
        label: "Source"
      }
    ],
    consumers: [], // all nodes that use the output of this node
    tmp: {}
  }
  return node;
}


function lfoPulse(cyclelength, pulsewidth, trigger, positive, negative){
  var node = {
    type: nodeType.NODE_LFO_PULSE,
    params: [
      {
        value: (cyclelength ? cyclelength[0] : 0),
        type: (cyclelength ? cyclelength[1] : paramType.EMPTY),
        label: "Cycle length"
      },
      {
        value: (pulsewidth ? pulsewidth[0] : 0),
        type: (pulsewidth ? pulsewidth[1] : paramType.EMPTY),
        label: "Pulse width"
      },
      {
        value: (trigger ? trigger[0] : 0),
        type: (trigger ? trigger[1] : paramType.EMPTY),
        label: "trigger"
      },
      {
        value: (positive ? positive[0] : 0),
        type: (positive ? positive[1] : paramType.EMPTY),
        label: "positive"
      },
      {
        value: (negative ? negative[0] : 0),
        type: (negative ? negative[1] : paramType.EMPTY),
        label: "negative"
      }
    ],
    consumers: [], // all nodes that use the output of this node
    tmp: {} // data used during matrix serialization calculation
  }
  return node;
}

module.exports.output = output;
module.exports.invert = invert;
module.exports.lfoPulse = lfoPulse;