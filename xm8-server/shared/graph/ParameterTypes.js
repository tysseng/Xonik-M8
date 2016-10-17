// TODO: validate constant value, max 32767 etc.

var paramTypesById = {
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
  VIRTUALINPUT: {
    id: "virtualinput", 
    name: "Virtual input",
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
var paramTypes = [
  paramTypesById.UNUSED,
  paramTypesById.CONSTANT,
  paramTypesById.INPUT,
  paramTypesById.VIRTUALINPUT,
  paramTypesById.OUTPUT,
  paramTypesById.LINK,
]

export { paramTypesById, paramTypes }