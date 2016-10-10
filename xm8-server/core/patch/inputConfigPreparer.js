import _ from 'lodash';
import { panelControllersById } from '../../shared/graph/PanelControllers';
import { inputStepGenerationTypesById } from '../../shared/inputs/InputStepsGenerationTypes';

export const prepareInputs = inputs => {
  _.each(inputs, input => {

    input.stepGenerationModeHwId = inputStepGenerationTypesById[input.stepGenerationMode].hwId;

    let min = input.min !== '' ? input.min : 0;
    let max = input.max !== '' ? input.max : 32767;

    input.max = max;
    input.min = min;

    if(input.stepGenerationMode === inputStepGenerationTypesById.NUMBER_OF_STEPS.id) {
      let range = max - min;
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