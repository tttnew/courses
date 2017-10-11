import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { combineReducers } from "redux";
import { createSelector } from "reselect";
import * as sortTypes from "../api/sortTypes";

function courses(state = initialState.course.courses, action) {
  switch (action.type) {
    case types.RECEIVE_COURSES_SUCCESS:
      return action.courses;
    default:
      return state;
  }
}
function lastId(state = initialState.course.lastId, action) {
  switch (action.type) {
    case types.RECEIVE_COURSES_SUCCESS:
      let id = 0;
      if (action.courses.length > 0) {
        id = [...action.courses].pop().id;
      }
      return id;
    default:
      return state;
  }
}
function isFetching(state = initialState.course.isFetching, action) {
  switch (action.type) {
    case types.REQUEST_COURSES:
      return true;
    case types.RECEIVE_COURSES_SUCCESS:
      return false;
    case types.RECEIVE_COURSES_ERROR:
      return false;
    default:
      return state;
  }
}
function updatedAt(state = initialState.course.updatedAt, action) {
  switch (action.type) {
    case types.RECEIVE_COURSES_SUCCESS:
      return action.receivedAt;
    case types.REFRESH_COURSES:
      return null;
    default:
      return state;
  }
}
function favorites(state = initialState.course.favorites, action) {
  switch (action.type) {
    case types.ADD_FAVORITE:
      return [...state, action.id];
    case types.REMOVE_FAVORITE:
      return state.filter(value => value !== action.id);
    default:
      return state;
  }
}

export default combineReducers({
  isFetching,
  courses,
  lastId,
  updatedAt,
  favorites
});

export const getFavoriteCourses = state => {
  return state.course.courses.filter(value => {
    return state.course.favorites.indexOf(value.id) > -1;
  });
};

export const getSortType = (state, props) => props.sortType;
export const getCourses = (state, props) => state.course.courses;
export const makeSortCourses = () => {
  return createSelector([getSortType, getCourses], (sortType, courses) => {
    switch (sortType) {
      case sortTypes.COST:
        return courses.sort((courseA, courseB) => {
          return Number(courseA.cost) - Number(courseB.cost);
        });
      case sortTypes.TIME:
        return courses.sort((courseA, courseB) => {
          return Number(courseA.hour_qty) - Number(courseB.hour_qty);
        });
      default:
        return courses.sort((courseA, courseB) => {
          return Number(courseA.id) - Number(courseB.id);
        });
    }
  });
};
