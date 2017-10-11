import * as types from "./actionTypes";
import fetch from "isomorphic-fetch";

export const requestCourses = () => {
  return {
    type: types.REQUEST_COURSES
  };
};

export const receiveCoursesSuccess = (courses, receivedAt) => {
  return {
    type: types.RECEIVE_COURSES_SUCCESS,
    courses,
    receivedAt
  };
};

export const receiveCoursesError = error => {
  return {
    type: types.RECEIVE_COURSES_ERROR,
    error
  };
};

export const refreshCourses = () => {
  return { type: types.REFRESH_COURSES };
};

// const urls = {
//   fetch: `http://www.courses.dev/courses`
// };
const urls = {
  fetch: `/courses`
};

export const fetchCourses = () => {
  return function(dispatch) {
    dispatch(requestCourses());
    return fetch(urls.fetch)
      .then(
        response => response.json(),
        error => dispatch(receiveCoursesError(error))
      )
      .then(json => {
        if (json.success) {
          dispatch(receiveCoursesSuccess(json.success, new Date().getTime()));
        } else {
          return Promise.reject();
        }
      });
  };
};

export const shouldUpdateCourses = () => {
  return function(dispatch, getState) {
    let { updatedAt } = getState().course;
    if (!updatedAt || new Date().getTime() - updatedAt > 1000 * 60) {
      return dispatch(fetchCourses());
    }
    return Promise.resolve();
  };
};
