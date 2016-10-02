import store from '../../../../core/state/store';
import { resetMatrix, toggleDirectOutput } from '../../../../shared/state/actions/matrix';
import { getMatrix } from '../../../../core/state/selectors';

let voiceGroupId = '0';

export const init = () => {
  store.dispatch(resetMatrix(voiceGroupId));
}

export const toggle = (input, output) => {
  store.dispatch(toggleDirectOutput(input.id, output.id, voiceGroupId));
}

export const getMutableMatrix = () => {
  return getMatrix(voiceGroupId).toJS();
}