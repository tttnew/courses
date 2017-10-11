import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "material-ui/Dialog";
import Course from "../forms/Course";
import {
  saveUserDataRequest,
  finishEditUserData
} from "../actions/userdataActions";
import FlatButton from "material-ui/FlatButton";
import { addFlashMessage } from "../actions/flashMessageActions";

class EditCourseDialog extends Component {
  handleClick = e => this.child.submit();

  render() {
    let { open, initialValues, handleClose, handleSave } = this.props;
    const actions = [
      <FlatButton label="Cancel" primary={true} onClick={handleClose} />,
      <FlatButton
        label="Save"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClick}
      />
    ];
    return (
      <Dialog
        title="Редактирование записи"
        actions={actions}
        modal={false}
        open={open}
        onRequestClose={handleClose}
      >
        <Course
          initialValues={initialValues}
          onSubmit={handleSave}
          ref={e => (this.child = e)}
        />
      </Dialog>
    );
  }
}

const mapStateToProps = state => {
  return {
    open: !!state.userdata.edit,
    initialValues: state.userdata.edit
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleClose: () => {
      dispatch(finishEditUserData());
    },
    handleSave: course => {
      dispatch(saveUserDataRequest(course))
        .then(() => {
          dispatch(addFlashMessage("Изменения сохранены"));
        })
        .catch(() => {
          dispatch(addFlashMessage("Ошибка"));
        });
    }
  };
};

EditCourseDialog = connect(mapStateToProps, mapDispatchToProps)(
  EditCourseDialog
);

export default EditCourseDialog;
