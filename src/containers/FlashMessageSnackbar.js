import { connect } from "react-redux";
import { closeFlashMessage } from "../actions/flashMessageActions";
import AppSnackbar from "../components/AppSnackbar";

const mapStateToProps = state => {
  return {
    message: state.flashMessage.text,
    open: state.flashMessage.open
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleRequestClose: () => {
      dispatch(closeFlashMessage());
    }
  };
};

const FlashMessageSnackbar = connect(mapStateToProps, mapDispatchToProps)(
  AppSnackbar
);

export default FlashMessageSnackbar;
