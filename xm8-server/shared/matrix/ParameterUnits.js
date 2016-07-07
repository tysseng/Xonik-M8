import _ from 'lodash';

// to make the math a bit easier, we pretend that the max positive value is 32768, but in reality is it capped off at 32767
const factors = {
  FRACTION: 32768,
  PERCENTAGE: 327.68,
  CENTS: 32768 / 6000, //(5 octaves * 12 semitones * 100 cents)
  SEMITONES: 32768 / 60,
  OCTAVES: 32768 / 5,
  VOLTS: 32768 / 5
}

// general conversion formulas
const to = (unit, value) => value / factors[unit];
const from = (unit, value) => Math.floor(value * factors[unit]);

// validators
const rangeValidator = (unit, value) => value <= unitsById[unit].max && value >= unitsById[unit].min;
const numberValidator = value => !isNaN(value);
const intValidator = value => value === parseInt(value, 10);

let units = [
  {
    id: 'FRACTION', 
    name: "Fraction", 
    min: -1, 
    max: 1, 
    converters: {
      to: value => to('FRACTION', value),
      from: fraction => { 
        if(fraction === 1) return 32767;
        return from('FRACTION', fraction);
      }
    }, 
    validator: (value) => numberValidator(value) && rangeValidator('FRACTION', value)
  },
  {
    id: 'PERCENTAGE', 
    name: "Percent", 
    min: -100, 
    max: 100, 
    converters: {
      to: value => to('PERCENTAGE', value),
      from: percent => { 
        if(percent === 100) return 32767;
        return from('PERCENTAGE', percent);
      }
    }, 
    validator: (value) => numberValidator(value) && rangeValidator('PERCENTAGE', value)
  },
  {
    id: 'CENTS', 
    name: "Cents", 
    min: -6000,
    max: 5999,
    converters: {
      to: value => to('CENTS', value),
      from: cents => from('CENTS', cents)    
    },  
    validator: (value) => numberValidator(value) && rangeValidator('CENTS', value)
  },
  {
    id: 'SEMITONES',
    name: "Semitones", 
    min: -60,
    max: 59,    
    converters: {
      to: value => to('SEMITONES', value),
      from: cents => from('SEMITONES', cents)    
    },  
    validator: (value) => numberValidator(value) && rangeValidator('SEMITONES', value)
  },
  {
    id: 'OCTAVES', 
    name: "Octaves", 
    min: -5,
    max: 5,    
    converters: {
      to: value => to('OCTAVES', value),
      from: octaves => { 
        if(octaves === 5) return 32767;
        return from('OCTAVES', octaves);
      }      
    },      
    validator: (value) => numberValidator(value) && rangeValidator('OCTAVES', value)
  },
  {
    id: 'VOLTS', 
    name: "Volts", 
    min: -5, 
    max: 5, 
    converters: {
      to: value => to('VOLTS', value),
      from: octaves => { 
        if(octaves === 5) return 32767;
        return from('VOLTS', octaves);
      }      
    },      
    validator: (value) => numberValidator(value) && rangeValidator('VOLTS', value)
  },
  {
    id: 'BINARY', 
    name: "Binary", 
    min: 0, 
    max: 1, 
    converters: {
      to: value => value > 0 ? 1 : 0,
      from: binary => binary === 0 ? 0 : 32767 
    },       
    validator: (value) => numberValidator(value) && intValidator(value) && rangeValidator('BINARY', value)
  },
  {
    id: 'DAC_VALUE', 
    name: "Dac value", 
    min: -32768, 
    max: 32767, 
    converters: {
      to: value => value,
      from: value => value,
    },  
    validator: (value) => numberValidator(value) && rangeValidator('DAC_VALUE', value)
  }
];

let unitsById = {};
_.each(units, unit => {
  unitsById[unit.id] = unit;
});

export {unitsById};
export default units;