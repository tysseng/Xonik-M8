import $ from 'jquery';
import InputGridLeftMenu from './InputGridLeftMenu';
import { connect } from 'react-redux';
import { openNewElementDialog } from '../../../shared/state/actions/inputgrid';

const mapStateToProps = (state, ownProps) => {
  let inputgrid = state.inputgrid;

  return {
    newElementDialog: inputgrid.get('newElementDialog').toJS()
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onOpenNewElementDialog: () => dispatch(openNewElementDialog())
  }
}

const InputGridLeftMenuContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(InputGridLeftMenu);

export default InputGridLeftMenuContainer;