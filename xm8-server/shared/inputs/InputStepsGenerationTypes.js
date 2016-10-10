import _ from 'lodash';

let inputStepGenerationTypesById = {
  CONTINOUS: {label: 'Continous', hwId: 0},
  PREDEFINED_INTERVAL: {label: 'Set interval', hwId: 1},
  NUMBER_OF_STEPS: {label: 'Set number of steps', hwId: 2},
  OPTIONS: {label: 'Use predefined option', hwId: 3}
}

// add ids to each object
_.each(inputStepGenerationTypesById, (type, id) => {
  type.id = id;
});

let inputStepGenerationTypes = [
  inputStepGenerationTypesById.CONTINOUS,
  inputStepGenerationTypesById.PREDEFINED_INTERVAL,
  inputStepGenerationTypesById.NUMBER_OF_STEPS,
  inputStepGenerationTypesById.OPTIONS
];

export {inputStepGenerationTypesById, inputStepGenerationTypes}