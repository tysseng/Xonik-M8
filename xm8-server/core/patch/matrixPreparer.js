import _ from 'lodash';
import { outputsById } from '../../shared/graph/Outputs';
import { inputsById } from '../../shared/graph/Inputs';
import { panelControllersById } from '../../shared/graph/PanelControllers';

export const getUsedDirectOutputs = (directoutputs, graphOutputs) => {

  let mappedDirectOutputs = {};

  _.each(directoutputs, (value, key) => {
    if(graphOutputs[key] === undefined || graphOutputs[key] === '') {
      console.log(key, value)
      let input = inputsById[value];
      let output = outputsById[key];

      let inputHwId = panelControllersById[input.panelController].hwId;
      mappedDirectOutputs[inputHwId] = output.hwId;
    }
  });

  return mappedDirectOutputs;
}