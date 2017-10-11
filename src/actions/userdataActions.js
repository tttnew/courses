import * as types from "./actionTypes";
import fetch from "isomorphic-fetch";
import { addFlashMessage } from "../actions/flashMessageActions";
import { refreshCourses } from "../actions/courseActions";
import { logOutUser } from "../actions/sessionActions";

export const requestUserData = () => {
  return {
    type: types.REQUEST_USER_DATA
  };
};

export const receiveUserDataSuccess = courses => {
  return {
    type: types.RECEIVE_USER_DATA_SUCCESS,
    courses
  };
};

export const receiveUserDataError = error => {
  return {
    type: types.RECEIVE_USER_DATA_ERROR,
    error
  };
};

export const addUserData = course => {
  return {
    type: types.ADD_USER_DATA,
    course
  };
};

export const deleteUserData = id => {
  return {
    type: types.DELETE_USER_DATA,
    id
  };
};

export const editUserData = course => {
  return {
    type: types.EDIT_USER_DATA,
    course
  };
};

export const saveUserData = course => {
  return {
    type: types.SAVE_USER_DATA,
    course
  };
};

export const finishEditUserData = () => {
  return {
    type: types.FINISH_EDIT_USER_DATA
  };
};

export const clearUserData = () => {
  return {
    type: types.CLEAR_USER_DATA
  };
};

const urls = {
  fetch: `http://www.courses.dev/userdata`,
  add: `http://www.courses.dev/adduserdata`,
  delete: `http://www.courses.dev/deleteuserdata`,
  save: `http://www.courses.dev/savedata`
};
// const urls = {
//   fetch: `/userdata`,
//   add: `/adduserdata`,
//   delete: `/deleteuserdata`,
//   save: `/savedata`
// };

const getHeaders = () => {
  let jwt = sessionStorage.getItem("jwt");
  return {
    AUTHORIZATION: `Bearer ${jwt}`,
    "Access-Control-Request-Headers": "x-requested-with",
    "X-Requested-With": "XMLHttpRequest",
    "Content-Type": "application/json"
  };
};

export const fetchUserData = () => {
  return function(dispatch, getState) {
    dispatch(requestUserData());
    return fetch(urls.fetch, {
      headers: getHeaders()
    })
      .then(response => responseHandler(response, dispatch))
      .then(
        response => response.json(),
        error => dispatch(receiveUserDataError(error))
      )
      .then(json => {
        if (json.success) {
          dispatch(receiveUserDataSuccess(json.success));
        } else if (json.error) {
          dispatch(receiveUserDataError(json.error));
          dispatch(addFlashMessage("Ошибка"));
        }
      });
  };
};

export const addUserDataRequest = course => {
  return function(dispatch, getState) {
    dispatch(requestUserData());
    return fetch(urls.add, {
      method: "POST",
      body: JSON.stringify(course),
      headers: getHeaders()
    })
      .then(response => responseHandler(response, dispatch))
      .then(
        response => response.json(),
        error => dispatch(receiveUserDataError(error))
      )
      .then(json => {
        if (json.success) {
          course.id = json.success.id;
          dispatch(addUserData(course));
          dispatch(refreshCourses());
        } else if (json.error) {
          dispatch(receiveUserDataError(json.error));
          return Promise.reject(json);
        }
      });
  };
};

export const deleteUserDataRequest = id => {
  return function(dispatch, getState) {
    dispatch(requestUserData());
    return fetch(urls.delete, {
      method: "POST",
      body: JSON.stringify({ id: id }),
      headers: getHeaders()
    })
      .then(response => responseHandler(response, dispatch))
      .then(
        response => response.json(),
        error => dispatch(receiveUserDataError(error))
      )
      .then(json => {
        if (json.success) {
          dispatch(deleteUserData(id));
          dispatch(refreshCourses());
        } else if (json.error) {
          dispatch(receiveUserDataError(json.error));
          return Promise.reject(json);
        }
      });
  };
};

export const saveUserDataRequest = course => {
  return function(dispatch, getState) {
    dispatch(requestUserData());
    return fetch(urls.save, {
      method: "POST",
      body: JSON.stringify(course),
      headers: getHeaders()
    })
      .then(response => responseHandler(response, dispatch))
      .then(
        response => response.json(),
        error => dispatch(receiveUserDataError(error))
      )
      .then(json => {
        if (json.success) {
          dispatch(saveUserData(course));
          dispatch(refreshCourses());
        } else {
          return Promise.reject(json);
        }
      });
  };
};

const responseHandler = (response, dispatch) => {
  if (response.status === 401) {
    dispatch(receiveUserDataError(response.statusText));
    dispatch(logOutUser());
    return Promise.reject(response.statusText);
  }
  return response;
};
