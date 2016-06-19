import _ from 'lodash';

let units = [
  {
    id: 0, 
    name: "Fraction", 
    min: -1, 
    max: 1, 
    converter: function(input){}, 
    validator: undefined
  },
  {
    id: 1, 
    name: "Percent", 
    min: -100, 
    max: 100, 
    converter: function(input){}, 
    validator: undefined
  },
  {
    id: 2, 
    name: "Cents", 
    converter: function(input){}, 
    validator: undefined
  },
  {
    id: 3,
    name: "Semitones", 
    converter: function(input){}, 
    validator: undefined
  },
  {
    id: 4, 
    name: "Octaves", 
    converter: function(input){}, 
    validator: undefined
  },
  {
    id: 5, 
    name: "Volts", 
    min: 5, 
    max: 5, 
    converter: function(input){}, 
    alidator: undefined
  },
  {
    id: 6, 
    name: "Binary", 
    min: 0, 
    max: 0, 
    converter: function(input){}, 
    validator: undefined
  },
  {
    id: 7, 
    name: "Dac value", 
    min: -32768, 
    max: 32767, 
    converter: function(input){}, 
    validator: undefined
  }
];

let unitsById = {};
_.each(units, unit => {
  unitsById[unit.id] = unit;
});

export {unitsById};
export default units;