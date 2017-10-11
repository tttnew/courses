import React, { Component } from "react";
import { connect } from "react-redux";
import { shouldUpdateCourses } from "../actions/courseActions";
import { toggleFavorite } from "../actions/favoriteActions";
import CoursesPage from "../components/CoursesPage";
import { addFlashMessage } from "../actions/flashMessageActions";
import { makeSortCourses } from "../reducers/courseReducer";

class CoursesPageAsync extends Component {
  componentDidMount() {
    let { fetchCourses } = this.props;
    fetchCourses();
  }
  render() {
    return <CoursesPage {...this.props} />;
  }
}

const mapStateToProps = (state, props) => {
  const sortCourses = makeSortCourses();
  return {
    courses: sortCourses(state, props.match.params),
    favorites: state.course.favorites,
    isFetching: state.course.isFetching
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleFavoriteClick: id => {
      dispatch(toggleFavorite(id));
    },
    fetchCourses: () => {
      dispatch(shouldUpdateCourses()).catch(() => {
        dispatch(addFlashMessage("Ошибка"));
      });
    }
  };
};

CoursesPageAsync = connect(mapStateToProps, mapDispatchToProps)(
  CoursesPageAsync
);
export default CoursesPageAsync;
