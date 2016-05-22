import {Map} from 'immutable';

const matrix = (state = Map({shouldAutoUpdate: false}), action) => {
  switch (action.type){
    case 'TOGGLE_AUTO_UPDATE':
      console.log("Changing auto update");
      return state.set("shouldAutoUpdate", action.shouldAutoUpdate);
    default: 
      return state;
  }
}

export default matrix