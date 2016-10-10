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
      input.stepInterval = Math.floor(range / input.numberOfSteps);
    }

    if(input.stepGenerationMode === inputStepGenerationTypesById.OPTIONS.id) {
      let optionValues = _.map(input.options, option => {
        return option.value;
      });
      input.optionValues = optionValues;

      if (isPhysicalInput(input) || hasNoPhysicalController(input)) {
        let optionValuesMidi = _.map(input.options, option => {
          return option.valuemidi;
        });
        input.optionValuesMidi = optionValuesMidi;
      }
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