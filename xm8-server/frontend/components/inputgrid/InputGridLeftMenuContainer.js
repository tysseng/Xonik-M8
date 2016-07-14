import $ from 'jquery';
import InputGridLeftMenu from './InputGridLeftMenu';
import { connect } from 'react-redux';
import { openNewElementDialog, newGroup } from '../../../shared/state/actions/inputgrid';

// TODO: MOVE THIS!
let nextGroupId = 0;

const mapStateToProps = (state, ownProps) => {
  let inputgrid = state.inputgrid;

  return {
    newElementDialog: inputgrid.get('newElementDialog').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpenNewElementDialog: () => dispatch(openNewElementDialog()),
    newGroup: () => dispatch(newGroup('' + nextGroupId++))

  }
}

const InputGridLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGridLeftMenu);

export default InputGridLeftMenuContainer;