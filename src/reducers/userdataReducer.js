import * as types from "../actions/actionTypes";
import initialState from "./initialState";
import { combineReducers } from "redux";

function courses(state = initialState.userdata.courses, action) {
  switch (action.type) {
    case types.RECEIVE_USER_DATA_SUCCESS:
      return action.courses;
    case types.ADD_USER_DATA:
      return [action.course, ...state];
    case types.SAVE_USER_DATA:
      return state.map(course => {
        if (course.id === action.course.id) {
          return action.course;
        }
        return course;
      });
    case types.DELETE_USER_DATA:
      return state.filter(course => {
        return !(course.id === action.id);
      });
    case types.CLEAR_USER_DATA:
      return [];
    default:
      return state;
  }
}

function isFetching(state = initialState.userdata.isFetching, action) {
  switch (action.type) {
    case types.REQUEST_USER_DATA:
      return true;
    case types.RECEIVE_USER_DATA_SUCCESS:
    case types.ADD_USER_DATA:
    case types.SAVE_USER_DATA:
    case types.DELETE_USER_DATA:
    case types.RECEIVE_USER_DATA_ERROR:
      return false;
    default:
      return state;
  }
}

function edit(state = initialState.userdata.edit, action) {
  switch (action.type) {
    case types.EDIT_USER_DATA:
      return action.course;
    case types.FINISH_EDIT_USER_DATA:
    case types.SAVE_USER_DATA:
      return 0;
    default:
      return state;
  }
}

export default combineReducers({
  isFetching,
  courses,
  edit
});
