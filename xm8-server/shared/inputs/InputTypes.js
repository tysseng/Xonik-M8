let inputTypes = [
  {
    id: 'VERTICAL_RANGE',
    name: 'range (vertical)'
  },
  {
    id: 'HORIZONTAL_RANGE',
    name: 'range (horizontal)'
  }  
]

let inputTypesById = {}
_.each(inputTypes, type => {
  inputTypesById[type.id] = type;
})

export {inputTypes, inputTypesById}