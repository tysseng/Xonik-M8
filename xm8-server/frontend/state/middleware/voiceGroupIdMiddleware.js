import { currentVoiceGroupId } from '../selectors';

// Replace patchNumber in actions that have a patchNumber but that patchNumber has not been
// explicitly set.
const voiceGroupIdMiddleware = store => next => action => {
  if(action.patchNumber === '-'){
    action.patchNumber = currentVoiceGroupId(store.getState());
  }
  return next(action);
}

export default voiceGroupIdMiddleware;