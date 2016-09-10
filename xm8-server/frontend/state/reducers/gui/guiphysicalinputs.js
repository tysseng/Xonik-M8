import { Map } from 'immutable';
import { types as inputActionTypes } from '../../../../shared/state/actions/inputs';
import { types as guiInputActionTypes } from '../../../../shared/state/actions/gui/guiinputs';

export const emptyState = Map({
  frontend: Map()
});

export const physicalInputs = (state = emptyState, action) => {
  switch(action.type){
    case guiInputActionTypes.INPUTCONFIG_SELECT_INPUT:
      if(action.inputType === 'physical'){
        return state.setIn(['frontend', 'selectedInput'], action.selectedInput);   
      }
      return state;
    case inputActionTypes.RESET_PHYSICAL_INPUTS:
      return state.setIn(['frontend', 'selectedInput'], '');
    default:
      return state;
  }
}


export default physicalInputs;