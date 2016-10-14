import _ from 'lodash';
import roundTo from 'round-to';

// The voice controller hardware is using 16bit signed integers to represent the dac values. With this scheme, the max input
// value is 32767 while the mininum value is -32768. This is a bit of a pain in the ass to work with, so to make the math a
// bit simpler, we pretend that the max positive value is 32768 and instead cap the value to 32767 before sending it to the 
// voice controller.

const factors = {
  FRACTION: {
    mult: 32768,
    precision: 4
  },
  PERCENTAGE: {
    mult: 327.68,
    precision: 2
  },
  CENTS: {
    mult: 32768 / 6000, //(5 octaves * 12 semitones * 100 cents)
    precision: 0
  }, 
  SEMITONES: {
    mult: 32768 / 60,
    precision: 2
  }, 
  OCTAVES: {
    mult: 32768 / 5,
    precision: 2
  }, 
  VOLTS: {
    mult: 32768 / 5,
    precision: 2
  }, 
}


const hasDecimalPoint = (value) => {
  return value && (typeof value  === 'string' || value instanceof String) && value.endsWith('.')
}

const padStartWithZero = (value) => {
  if(value && (typeof value  === 'string' || value instanceof String)){
    if(value.startsWith('.')){
      return '0' + value;
    } else if(value.startsWith('-.')) {
      return '-0' + value.substr(1);
    }
  }
  return value; 
}

const startsWith = (value, start) => {
  return value && (typeof value  === 'string' || value instanceof String) && value.startsWith(start);
}

const shouldNotBeFormatted = (value) => {
  return (
    startsWith(value, '-') && value.length === 1 || 
    (startsWith(value, '-.') || startsWith(value, '-0')) && value.length === 2 ||
    startsWith(value, '-0.') && value.length === 3
  );
}

// general conversion formulas
// Convert to a unit from signed 32bit int.
const to = (unit, value) => {
  if(value === undefined || value === '') return '';

  if(shouldNotBeFormatted(value)) return value;

  let convertedValue = roundTo(value / factors[unit].mult, factors[unit].precision);

  // Make sure to keep decimal point after conversion. Without this it will be impossible
  // to enter a decimal number
  if(hasDecimalPoint(value)) {
    convertedValue = convertedValue + '.';
  }    

  return convertedValue;
}

// Convert to signed 32bit int from a unit.
const from = (unit, value) => {

  //TODO: Crop decimal string to current precision level

  if(value === undefined || value === '') return '';

  if(shouldNotBeFormatted(value)) return value;

  value = padStartWithZero(value);

  let convertedValue = Math.floor(value * factors[unit].mult);
  if(hasDecimalPoint(value)){
    convertedValue += '.';
  }  
  return convertedValue;
}

// validators
const rangeValidator = (unit, value) => value <= unitsById[unit].max && value >= unitsById[unit].min;
const numberValidator = value => !isNaN(value);
const intValidator = value => value === parseInt(value, 10);

let unitsById = {
  FRACTION: {
    name: "Fraction", 
    min: -1, 
    max: 1, 
    converters: {
      to: value => to('FRACTION', value),
      from: fraction => from('FRACTION', fraction)
    }, 
    validator: (value) => numberValidator(value) && rangeValidator('FRACTION', value)
  },
  PERCENTAGE: {
    name: "Percent",
    min: -100, 
    max: 100, 
    converters: {
      to: value => to('PERCENTAGE', value),
      from: percent => from('PERCENTAGE', percent)      
    }, 
    validator: (value) => numberValidator(value) && rangeValidator('PERCENTAGE', value)
  },
  CENTS: {
    name: "Cents",
    min: -6000,
    max: 6000,
    converters: {
      to: value => to('CENTS', value),
      from: cents => from('CENTS', cents)    
    },  
    validator: (value) => numberValidator(value) && rangeValidator('CENTS', value)
  },
  SEMITONES: {
    name: "Semitones",
    min: -60,
    max: 60,    
    converters: {
      to: value => to('SEMITONES', value),
      from: cents => from('SEMITONES', cents)    
    },  
    validator: (value) => numberValidator(value) && rangeValidator('SEMITONES', value)
  },
  OCTAVES: {
    name: "Octaves",
    min: -5,
    max: 5,    
    converters: {
      to: value => to('OCTAVES', value),
      from: octaves => from('OCTAVES', octaves)
    },      
    validator: (value) => numberValidator(value) && rangeValidator('OCTAVES', value)
  },
  VOLTS: {
    name: "Volts",
    min: -5, 
    max: 5, 
    converters: {
      to: value => to('VOLTS', value),
      from: octaves => from('VOLTS', octaves)
    },      
    validator: (value) => numberValidator(value) && rangeValidator('VOLTS', value)
  },
  BINARY: {
    name: "Binary",
    min: 0, 
    max: 1, 
    converters: {
      to: value => value > 0 ? 1 : 0,
      from: binary => binary === 0 ? 0 : 32767 
    },       
    validator: (value) => numberValidator(value) && intValidator(value) && rangeValidator('BINARY', value)
  },
  DAC_VALUE: {
    name: "Dac value",
    min: -32768, 
    max: 32768, 
    converters: {
      to: value => value,
      from: value => value,
    },  
    validator: (value) => numberValidator(value) && rangeValidator('DAC_VALUE', value)
  }
};

// add ids to each object
_.each(unitsById, (unit, id) => {
  unit.id = id;
});

let units = [
  unitsById.FRACTION,
  unitsById.PERCENTAGE,
  unitsById.CENTS,
  unitsById.SEMITONES,
  unitsById.OCTAVES,
  unitsById.VOLTS,
  unitsById.BINARY,
  unitsById.DAC_VALUE
]

export {unitsById};
export default units;