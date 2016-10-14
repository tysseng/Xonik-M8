import _ from 'lodash';
import { panelControllersById } from '../../shared/graph/PanelControllers';
import { inputStepGenerationTypesById } from '../../shared/inputs/InputStepsGenerationTypes';

export const prepareInputs = inputs => {
  _.each(inputs, input => {

    input.stepGenerationModeHwId = inputStepGenerationTypesById[input.stepGenerationMode].hwId;

    input.min = input.min !== '' ? input.min : 0;
    input.max = input.max !== '' ? input.max : 32767;

    if(input.stepGenerationMode === inputStepGenerationTypesById.NUMBER_OF_STEPS.id) {

      let range = input.max - input.min;
      input.numberOfSteps = input.numberOfSteps !== '' ? input.numberOfSteps : 1;
      input.stepGenerationValue = Math.floor(range / input.numberOfSteps);

    } else if(input.stepGenerationMode === inputStepGenerationTypesById.PREDEFINED_INTERVAL.id) {

      input.stepGenerationValue = input.stepInterval;

    } else if(input.stepGenerationMode === inputStepGenerationTypesById.OPTIONS.id) {

      input.stepGenerationValue = Object.keys(input.options).length;

      input.optionValues = _.map(input.options, option => {
        return option.value;
      });

      if (isPhysicalInput(input) || hasNoPhysicalController(input)) {
        input.optionValuesMidi = _.map(input.options, option => {
          return option.valuemidi;
        });
      }
    } else {
      // continous
      input.stepGenerationValue = 1;
    }

    if(isPhysicalInput(input) || hasNoPhysicalController(input)) {
      input.includeMidi = true;
    }
  });

  return inputs;
}

const isPhysicalInput = input => {
  return !input.id.startsWith('virt|');
}

const hasNoPhysicalController = input => {
  return input.panelController === panelControllersById.PC_VIRTUAL.id;
}

const hasPhysicalController = input => {
  return input.panelController !== panelControllersById.PC_VIRTUAL.id;
}