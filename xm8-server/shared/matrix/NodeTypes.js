var _ = require('lodash');

// TODO: add hw ids
// TODO: Add property key as key instead, and loop over list to make map?
var nodeTypes = {
  NOT_SELECTED: {
    id: "-1", name: "Type not selected", params: []
  },
  SUM: {
    id: "24", name: "Sum", params: []
  },
  INVERT: {
    id: "1", 
    name: "Invert", 
    description: "Invert around 0",
    params: [{
      id: "0",
      name: "To invert",
      validator: function(value){},
      optional: false
    }]
  },
  INVERT_EACH_SIDE: {
    id: "2", name: "Invert each side", params: []
  },
  RAMP: {
    id: "3", name: "Ramp", params: []
  },
  DELAY_LINE: {
    id: "4", name: "Delay line", params: []
  },
  MULTIPLY: {
    id: "5", name: "Multiply", params: []
  },
  MEMORY: {
    id: "6", name: "Memory", params: []
  },
  LFO_PULSE: {
    id: "7", name: "Lfo - pulse", params: []
  },
  SWITCH: {
    id: "8", name: "Switch", params: []
  },
  COMPARE: {
    id: "9", name: "Compare", params: []
  },
  MAX: {
    id: "10", 
    name: "Max",
    description: "Maximum of parameter 1 to parameter 8",
    params: [{
      id: "0",
      name: "Parameter 1",
      validator: function(value){},
      optional: false
    },
    {
      id: "1",
      name: "Parameter 2",
      validator: function(value){},
      optional: true
    },
    {
      id: "2",
      name: "Parameter 3",
      validator: function(value){},
      optional: true
    },
    {
      id: "3",
      name: "Parameter 4",
      validator: function(value){},
      optional: true
    },
    {
      id: "4",
      name: "Parameter 5",
      validator: function(value){},
      optional: true
    },
    {
      id: "5",
      name: "Parameter 6",
      validator: function(value){},
      optional: true
    },
    {
      id: "6",
      name: "Parameter 7",
      validator: function(value){},
      optional: true
    },
    {
      id: "7",
      name: "Parameter 8",
      validator: function(value){},
      optional: true
    }
    ]
  },
  MIN: {
    id: "11", name: "Min", params: []
  },
  SCALE: {
    id: "12", name: "Scale", params: []
  },
  TRIGGER: {
    id: "13", name: "Trigger", params: []
  },
  BINARY_AND: {
    id: "14", name: "Binary and", params: []
  },
  BINARY_OR: {
    id: "15", name: "Binary or", params: []
  },
  BINARY_XOR: {
    id: "16", name: "Binary xor", params: []
  },
  BINARY_NOT: {
    id: "17", name: "Binary not", params: []
  },
  BUFFER_PARAMETER: {
    id: "18", name: "Buffer parameter", params: []
  },
  OUTPUT: {
    id: "19", 
    name: "Output",     
    description: "Output to voice",
    params: [{
      id: "0",
      name: "To output",
      validator: function(value){},
      optional: false
    }]    
  }, 
  OUTPUT_TUNED: {
    id: "20", name: "Output tuned", params: []
  },
  GLIDE: {
    id: "21", name: "Glide", params: []
  },  
  QUANTIZE: {
    id: "22", name: "Quantize", params: []
  },  
  POSITIVE_EXPONENTIAL: {
    id: "23", name: "Positive exponential", params: []
  }
};

var nodeTypesList = [
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
var nodeTypesIdMap = {};
_.each(nodeTypesList, function(nodeType){
  nodeTypesIdMap[nodeType.id] = nodeType;
});

module.exports.map = nodeTypes;
module.exports.list = nodeTypesList;
module.exports.idMap = nodeTypesIdMap;