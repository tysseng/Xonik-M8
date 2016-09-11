import { Map } from 'immutable';
import { types } from '../../../../shared/state/actions/gui/guimatrix';

const emptyState = Map({
  hover: Map({inputId: '', outputId: ''})
});

const root = (state = emptyState, action) => {
  switch(action.type){
    case types.DIRECT_OUTPUT_HOVER:
      return state.set('hover', Map({inputId: action.inputId, outputId: action.outputId}));
    default:
      return state;
  }
}

export default root;
