import _ from 'lodash';
import { map as paramTypes } from './ParameterTypes';
// TODO: add hw ids
// TODO: Add property key as key instead, and loop over list to make map?

// global type blacklist is only used if no white or blacklist exists for a parameter
const globalTypeBlacklist = [
  paramTypes.OUTPUT.id
];

const nodeTypes = {
  NOT_SELECTED: {
    id: "-1", name: "Type not selected", params: []
  },
  SUM: {
    id: "24", 
    name: "Sum", 
    description: "Sum two or more values",
    hasVariableParamsLength: true,    
    params: [{
      id: "0",
      name: "Value 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Value 2",
      validator: function(value){},
      optional: false
    },
    {
      id: "2",
      name: "Value 3",
      validator: function(value){},
      optional: true
    },
    {
      id: "3",
      name: "Value 4",
      validator: function(value){},
      optional: true
    },
    {
      id: "4",
      name: "Value 5",
      validator: function(value){},
      optional: true
    },
    {
      id: "5",
      name: "Value 6",
      validator: function(value){},
      optional: true
    },
    {
      id: "6",
      name: "Value 7",
      validator: function(value){},
      optional: true
    },
    {
      id: "7",
      name: "Value 8",
      validator: function(value){},
      optional: true
    }]
  },
  INVERT: {
    id: "1", 
    name: "Invert", 
    description: "Invert around 0",
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Value to invert",
      validator: function(value){},
      optional: false
    }]
  },
  INVERT_EACH_SIDE: {
    id: "2", 
    name: "Invert each side", 
    description: "Invert around positive or negative center",
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Value to invert",
      validator: function(value){},
      optional: false
    }]
  },
  RAMP: {
    id: "3", name: "Ramp", params: []
  },
  DELAY_LINE: {
    id: "4", 
    name: "Delay line", 
    description: "Delay a value for one cycle, allowing loops in the network",
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Value to delay",
      validator: function(value){},
      optional: false
    }]
  },
  MULTIPLY: {
    id: "5", 
    name: "Multiply",
    description: "Multiply two or more values",
    hasVariableParamsLength: true,
    params: [{
      id: "0",
      name: "Value 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Value 2",
      validator: function(value){},
      optional: false
    },
    {
      id: "2",
      name: "Value 3",
      validator: function(value){},
      optional: true
    },
    {
      id: "3",
      name: "Value 4",
      validator: function(value){},
      optional: true
    },
    {
      id: "4",
      name: "Value 5",
      validator: function(value){},
      optional: true
    },
    {
      id: "5",
      name: "Value 6",
      validator: function(value){},
      optional: true
    },
    {
      id: "6",
      name: "Value 7",
      validator: function(value){},
      optional: true
    },
    {
      id: "7",
      name: "Value 8",
      validator: function(value){},
      optional: true
    }]
  },
  MEMORY: {
    id: "6", 
    name: "Memory",
    description: "Sample and hold a value",    
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Value to sample",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Set",
      validator: function(value){},
      optional: false
    },
    {
      id: "2",
      name: "Reset",
      validator: function(value){},
      optional: false
    }]     
  },
  LFO_PULSE: {
    id: "7", 
    name: "Lfo - pulse",
    description: "Square wave LFO with variable pulse width and amplitude", 
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Cycle length",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Pulse width",
      validator: function(value){},
      optional: false
    },
    {
      id: "2",
      name: "Trigger",
      validator: function(value){},
      optional: false
    },
    {
      id: "3",
      name: "Max positive",
      validator: function(value){},
      optional: false
    },
    {
      id: "4",
      name: "Max negative",
      validator: function(value){},
      optional: false
    },
    {
      id: "5",
      name: "Start position",
      validator: function(value){},
      optional: false
    }]
  },
  SWITCH: {
    id: "8", 
    name: "Switch",
    description: "Passes or blocks a signal", 
    hasVariableParamsLength: false,    
    params: [{
      id: "0",
      name: "Value",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Switch control",
      validator: function(value){},
      optional: false
    }]
  },
  COMPARE: {
    id: "9", 
    name: "Compare", 
    description: "Compares values, if value 1 is larger, output is max, else it is min.",
    hasVariableParamsLength: false,    
    params: [{
      id: "0",
      name: "Value 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Value 2",
      validator: function(value){},
      optional: false
    }]
  },
  MAX: {
    id: "10", 
    name: "Max",    
    description: "Maximum of value 1 to value 8",
    hasVariableParamsLength: true,
    params: [{
      id: "0",
      name: "Value 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Value 2",
      validator: function(value){},
      optional: false
    },
    {
      id: "2",
      name: "Value 3",
      validator: function(value){},
      optional: true
    },
    {
      id: "3",
      name: "Value 4",
      validator: function(value){},
      optional: true
    },
    {
      id: "4",
      name: "Value 5",
      validator: function(value){},
      optional: true
    },
    {
      id: "5",
      name: "Value 6",
      validator: function(value){},
      optional: true
    },
    {
      id: "6",
      name: "Value 7",
      validator: function(value){},
      optional: true
    },
    {
      id: "7",
      name: "Value 8",
      validator: function(value){},
      optional: true
    }]
  },
  MIN: {
    id: "11", 
    name: "Min", 
    description: "Minimum of parameter 1 to parameter 8",
    hasVariableParamsLength: true,
    params: [{
      id: "0",
      name: "Value 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Value 2",
      validator: function(value){},
      optional: false
    },
    {
      id: "2",
      name: "Value 3",
      validator: function(value){},
      optional: true
    },
    {
      id: "3",
      name: "Value 4",
      validator: function(value){},
      optional: true
    },
    {
      id: "4",
      name: "Value 5",
      validator: function(value){},
      optional: true
    },
    {
      id: "5",
      name: "Value 6",
      validator: function(value){},
      optional: true
    },
    {
      id: "6",
      name: "Value 7",
      validator: function(value){},
      optional: true
    },
    {
      id: "7",
      name: "Value 8",
      validator: function(value){},
      optional: true
    }]
  },
  SCALE: {
    id: "12", 
    name: "Scale",
    description: "Scales value by factor, where factor / (MAX_POSITIVE + 1)",
    hasVariableParamsLength: false,    
    params: [{
      id: "0",
      name: "Value to scale",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Scale factor",
      validator: function(value){},
      optional: false
    }]
  },
  TRIGGER: {    
    id: "13", 
    name: "Trigger", 
    description: "Generates a pulse lasting for one cycle after the input changes from negative to positive.",
    hasVariableParamsLength: false,   
    params: [{
      id: "0",
      name: "Control",
      validator: function(value){},
      optional: false
    }]
  },
  BINARY_AND: {
    id: "14", 
    name: "Binary and", 
    description: "Treat inputs as a binary values and binary AND them",
    hasVariableParamsLength: true,   
    params: [{
      id: "0",
      name: "Value 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Value 2",
      validator: function(value){},
      optional: false
    },
    {
      id: "2",
      name: "Value 3",
      validator: function(value){},
      optional: true
    },
    {
      id: "3",
      name: "Value 4",
      validator: function(value){},
      optional: true
    },
    {
      id: "4",
      name: "Value 5",
      validator: function(value){},
      optional: true
    },
    {
      id: "5",
      name: "Value 6",
      validator: function(value){},
      optional: true
    },
    {
      id: "6",
      name: "Value 7",
      validator: function(value){},
      optional: true
    },
    {
      id: "7",
      name: "Value 8",
      validator: function(value){},
      optional: true
    }]
  },
  BINARY_OR: {
    id: "15", 
    name: "Binary or", 
    description: "Treat inputs as a binary values and binary OR them",
    hasVariableParamsLength: true,   
    params: [{
      id: "0",
      name: "Value 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Value 2",
      validator: function(value){},
      optional: false
    },
    {
      id: "2",
      name: "Value 3",
      validator: function(value){},
      optional: true
    },
    {
      id: "3",
      name: "Value 4",
      validator: function(value){},
      optional: true
    },
    {
      id: "4",
      name: "Value 5",
      validator: function(value){},
      optional: true
    },
    {
      id: "5",
      name: "Value 6",
      validator: function(value){},
      optional: true
    },
    {
      id: "6",
      name: "Value 7",
      validator: function(value){},
      optional: true
    },
    {
      id: "7",
      name: "Value 8",
      validator: function(value){},
      optional: true
    }]
  },
  BINARY_XOR: {
    id: "16", 
    name: "Binary xor", 
    description: "Treat inputs as a binary values and binary XOR them",
    hasVariableParamsLength: false,   
    params: [{
      id: "0",
      name: "Value 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Value 2",
      validator: function(value){},
      optional: false
    }]
  },
  BINARY_NOT: {
    id: "17", 
    name: "Binary not", 
    description: "Treat input as a binary value and binary INVERT it",
    hasVariableParamsLength: false,   
    params: [{
      id: "0",
      name: "Value to Invert",
      validator: function(value){},
      optional: false
    }]
  },
  BUFFER_PARAMETER: {
    id: "18", 
    name: "Buffer parameter", 
    description: "Buffer a value for the entire duration of the graph calculation cycle. Use this if an input must be guaranteed to be the same for all nodes during a cycle",
    hasVariableParamsLength: false,   
    params: []
  },
  OUTPUT: {
    id: "19", 
    name: "Output",     
    description: "Write output to voice",
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Output value",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Output target",
      validator: function(value){},
      optional: false,
      typeWhitelist: [paramTypes.OUTPUT.id]
    }]    
  }, 
  OUTPUT_TUNED: {
    id: "20", 
    name: "Output tuned",
    description: "Write output to voice and correct for vco tuning",
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Output value",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Output to VCO",
      validator: function(value){},
      optional: false,
      typeWhitelist: [paramTypes.OUTPUT.id]
    }]
  },
  GLIDE: {
    id: "21", 
    name: "Glide", 
    description: "Glide any output. Resists change.",
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Value",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Rate of change",
      validator: function(value){},
      optional: false
    },
    {
      id: "3",
      name: "Glide on up",
      validator: function(value){},      
      optional: false
    },
    {
      id: "4",
      name: "Glide on down",
      validator: function(value){},
      optional: false
    }]
  },  
  QUANTIZE: {
    id: "22", 
    name: "Quantize", 
    hasVariableParamsLength: false,
    params: []
  },  
  POSITIVE_EXPONENTIAL: {
    id: "23", 
    name: "Positive exponential", 
    description: "Convert linear value to exponential. Only positive values are converted, all others are 0, to allow maximum offness.",
    hasVariableParamsLength: false,
    params: [{
      id: "0",
      name: "Value",
      validator: function(value){},
      optional: false
    }]
  }
};

const nodeTypesList = [
  nodeTypes.NOT_SELECTED,
  nodeTypes.SUM,
  nodeTypes.INVERT,
  nodeTypes.INVERT_EACH_SIDE,
  nodeTypes.RAMP,
  nodeTypes.DELAY_LINE,
  nodeTypes.MULTIPLY,
  nodeTypes.MEMORY,
  nodeTypes.LFO_PULSE,
  nodeTypes.SWITCH,
  nodeTypes.COMPARE,
  nodeTypes.MAX,
  nodeTypes.MIN,
  nodeTypes.SCALE,
  nodeTypes.TRIGGER,
  nodeTypes.BINARY_AND,
  nodeTypes.BINARY_OR,
  nodeTypes.BINARY_XOR,
  nodeTypes.BINARY_NOT,
  nodeTypes.BUFFER_PARAMETER,
  nodeTypes.OUTPUT,
  nodeTypes.OUTPUT_TUNED,
  nodeTypes.GLIDE,
  nodeTypes.QUANTIZE,
  nodeTypes.POSITIVE_EXPONENTIAL
];

// make it easy to lookup a node type based on its id
let nodeTypesIdMap = {};
_.each(nodeTypesList, function(nodeType){
  nodeTypesIdMap[nodeType.id] = nodeType;
});

module.exports.map = nodeTypes;
module.exports.list = nodeTypesList;
module.exports.idMap = nodeTypesIdMap;
module.exports.globalTypeBlacklist = globalTypeBlacklist;