import _ from 'lodash';

let inputTypes = [
  {
    id: 'VERTICAL_RANGE',
    name: 'Range (vertical)',
    size: {
      x: 4,
      y: 17
    }
  },
  {
    id: 'HORIZONTAL_RANGE',
    name: 'Range (horizontal)',
    size: {
      x: 15,
      y: 5
    }
  }  
];

let inputTypesById = {};
_.each(inputTypes, type => {
  inputTypesById[type.id] = type;
});

export {inputTypes, inputTypesById}