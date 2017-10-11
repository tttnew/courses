import React, { Component } from "react";
import { connect } from "react-redux";
import { shouldUpdateCourses } from "../actions/courseActions";
import { toggleFavorite } from "../actions/favoriteActions";
import CoursesPage from "../components/CoursesPage";
import { getFavoriteCourses } from "../reducers/courseReducer";
import { addFlashMessage } from "../actions/flashMessageActions";

class FavoritesPageAsync extends Component {
  componentDidMount() {
    let { fetchCourses, courses } = this.props;
    if (courses.length === 0) {
      fetchCourses();
    }
  }
  render() {
    return <CoursesPage {...this.props} />;
  }
}

const mapStateToProps = state => {
  return {
    courses: getFavoriteCourses(state),
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

FavoritesPageAsync = connect(mapStateToProps, mapDispatchToProps)(
  FavoritesPageAsync
);
export default FavoritesPageAsync;
