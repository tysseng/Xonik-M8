import _ from 'lodash';
import { panelControllersById } from '../../shared/graph/PanelControllers';

export const prepareInputs = inputs => {
  _.each(inputs, input => {
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
  });

  return inputs;
}

const isPhysicalInput = input => {
  return !input.id.startsWith('virt|');
}

const hasNoPhysicalController = input => {
  return input.panelController === panelControllersById.PC_VIRTUAL.id;
}