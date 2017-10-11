import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchUserData, editUserData } from "../actions/userdataActions";
import { showModal } from "../actions/modalActions";
import UserPage from "../components/UserPage";
import EditCourseDialog from "../containers/EditCourseDialog";
import DeleteCourseDialog from "../containers/DeleteCourseDialog";
import AddCourseDialog from "../containers/AddCourseDialog";
import * as modal from "../api/modalTypes";

class UserPageAsync extends Component {
  componentDidMount() {
    const { fetchData, courses } = this.props;
    if (courses.length === 0) {
      fetchData();
    }
  }
  render() {
    return (
      <div>
        <EditCourseDialog />
        <AddCourseDialog />
        <DeleteCourseDialog />
        <UserPage {...this.props} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    courses: state.userdata.courses,
    isFetching: state.userdata.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => {
      dispatch(fetchUserData());
    },
    handleEditData: course => {
      dispatch(editUserData(course));
    },
    handleDeleteData: id => {
      dispatch(showModal(modal.DELETE_USER_DATA, id));
    },
    handleAddData: () => {
      dispatch(showModal(modal.ADD_USER_DATA));
    }
  };
};

UserPageAsync = connect(mapStateToProps, mapDispatchToProps)(UserPageAsync);
export default UserPageAsync;
