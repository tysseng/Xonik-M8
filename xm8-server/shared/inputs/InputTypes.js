import _ from 'lodash';

let inputTypesById = {
  VERTICAL_RANGE: {
    name: 'Range (vertical)',
    size: {
      x: 4,
      y: 17
    }
  },
  HORIZONTAL_RANGE: {
    name: 'Range (horizontal)',
    size: {
      x: 15,
      y: 5
    }
  }
}

// add ids to each object
_.each(inputTypesById, (inputType, id) => {
  inputType.id = id;
});

let inputTypes = [
  inputTypesById.VERTICAL_RANGE,
  inputTypesById.HORIZONTAL_RANGE
];

export {inputTypes, inputTypesById}