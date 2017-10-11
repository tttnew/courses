import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import { deleteUserDataRequest } from "../actions/userdataActions";
import { hideModal } from "../actions/modalActions";
import * as modal from "../api/modalTypes";
import FlatButton from "material-ui/FlatButton";
import { addFlashMessage } from "../actions/flashMessageActions";

class DeleteCourseDialog extends Component {
  render() {
    let { handleDelete, handleClose, open, id } = this.props;
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={handleClose}
        keyboardFocused={true}
      />,
      <FlatButton
        label="Delete"
        primary={true}
        onClick={() => {
          handleDelete(id);
        }}
      />
    ];
    return (
      <Dialog
        title="Удаление записи"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        Вы действительно хотите удалить курс?
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.modal.open && state.modal.modalType === modal.DELETE_USER_DATA,
    id: state.modal.data
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => {
      dispatch(hideModal());
    },
    handleDelete: id => {
      dispatch(deleteUserDataRequest(id))
        .then(() => {
          dispatch(hideModal());
          dispatch(addFlashMessage("Запись удалена"));
        })
        .catch(() => {
          dispatch(addFlashMessage("Ошибка"));
        });
    }
  };
};

DeleteCourseDialog = connect(mapStateToProps, mapDispatchToProps)(
  DeleteCourseDialog
);

export default DeleteCourseDialog;
