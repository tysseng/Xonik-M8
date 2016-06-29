import {OrderedMap, Map, Iterable, fromJS} from 'immutable';
import _ from 'lodash';
import {inputsById, inputGroupsById} from '../../shared/matrix/inputs';

const groups = (state,action) => {

  switch(action.type){
  } 
  return state;
}

const byId = (state, action) => {

  switch(action.type){
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
  } 
  return state;
}

export default root;
