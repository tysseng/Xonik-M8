// TODO: validate constant value, max 65535

var parameterTypes = {
  UNUSED: {
    id: "unused", 
    name: "Unused",
    validator: function(input){}
  },
  CONSTANT: {
    id: "constant",
    name: "Constant", 
    validator: function(input){}
  },  
  INPUT: {
    id: "input", 
    name: "Input from",
    validator: function(input){}
  },
  OUTPUT: {
    id: "output", 
    name: "Output to",
    validator: function(input){}
  },
  LINK: {
    id: "result", 
    name: "Result of", 
    validator: function(input){}
  },
};

// sorted list for dropdowns etc
var parameterTypesList = [
  parameterTypes.UNUSED,
  parameterTypes.CONSTANT,
  parameterTypes.INPUT,
  parameterTypes.OUTPUT,
  parameterTypes.LINK,
]

module.exports.map = parameterTypes;
module.exports.list = parameterTypesList;