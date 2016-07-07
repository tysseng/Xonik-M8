let inputTypes = [
  {
    id: 'VERTICAL_RANGE',
    name: 'Range (vertical)'
  },
  {
    id: 'HORIZONTAL_RANGE',
    name: 'Range (horizontal)'
  }  
]

let inputTypesById = {}
_.each(inputTypes, type => {
  inputTypesById[type.id] = type;
})

export {inputTypes, inputTypesById}