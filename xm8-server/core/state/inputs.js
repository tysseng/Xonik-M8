import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import {inputsById, inputGroupsById} from '../../shared/matrix/inputs';
import inputActionTypes from '../../shared/state/actions/inputsActionTypes';

const groups = (state,action) => {

  switch(action.type){
  } 
  return state;
}

const input = (state, action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_RENAME:       
      return state.setIn(['name', 'full'], action.name);  
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:
      return state.setIn(['name', 'short'], action.name);  
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_STATUS:
      return state.setIn(['midi', 'receive', 'status'], parseInt(action.value));  
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_DATA_1:
      return state.setIn(['midi', 'receive', 'data1'], parseInt(action.value));
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_STATUS:    
      return state.setIn(['midi', 'transmit', 'status'], parseInt(action.value));
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_DATA_1:    
      return state.setIn(['midi', 'transmit', 'data1'], parseInt(action.value));
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_HIRES:  
      return state.setIn(['midi', 'transmit', 'hires'], action.value);
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_HIRES:  
      return state.setIn(['midi', 'transmit', 'hires'], action.value);
  }
  return state;
}

const byId = (state, action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_RENAME:        
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_STATUS:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_DATA_1:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_STATUS:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_DATA_1:  
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_HIRES:  
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_HIRES:  
      return state.updateIn([action.inputId], inputElem => input(inputElem, action)); 
  } 
  return state;
}

const root = (
  state = Map({
    byId: fromJS(inputsById),
    groups: fromJS(inputGroupsById)
  }),
  action) => {
  switch(action.type){
    case inputActionTypes.INPUTCONFIG_RENAME:        
    case inputActionTypes.INPUTCONFIG_RENAME_SHORT:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_STATUS:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_DATA_1:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_STATUS:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_DATA_1:
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_TRANSMIT_HIRES:  
    case inputActionTypes.INPUTCONFIG_UPDATE_MIDI_RECEIVE_HIRES:      
      return state.updateIn(['byId'], (inputByIdMap) => byId(inputByIdMap, action));
  } 
  return state;
}

export default root;
