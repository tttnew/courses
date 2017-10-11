import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import Course from "../forms/Course";
import { addUserDataRequest } from "../actions/userdataActions";
import FlatButton from "material-ui/FlatButton";
import { hideModal } from "../actions/modalActions";
import * as modal from "../api/modalTypes";
import { addFlashMessage } from "../actions/flashMessageActions";

class AddCourseDialog extends Component {
  handleClick = e => this.child.submit();

  render() {
    let { open, handleClose, handleAdd } = this.props;
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={handleClose} />,
      <FlatButton
        label="Add"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClick}
      />
    ];
    return (
      <Dialog
        title="Добавление курса"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        <Course onSubmit={handleAdd} ref={e => (this.child = e)} />
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: state.modal.open && state.modal.modalType === modal.ADD_USER_DATA
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => {
      dispatch(hideModal());
    },
    handleAdd: course => {
      dispatch(addUserDataRequest(course))
        .then(() => {
          dispatch(addFlashMessage('Запись добавлена'));
          dispatch(hideModal());
        })
        .catch(() => {
          dispatch(addFlashMessage('Ошибка'));
        });
    }
  };
};

AddCourseDialog = connect(mapStateToProps, mapDispatchToProps)(AddCourseDialog);

export default AddCourseDialog;
