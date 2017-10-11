import * as types from "./actionTypes";
import fetch from "isomorphic-fetch";
import { clearUserData } from "./userdataActions";
import authApi from "../api/authApi";

// const urls = {
//   login: "http://www.courses.dev/signin",
//   registration: "http://www.courses.dev/signup",
//   testAuth: "http://www.courses.dev/getuser",
// };
const urls = {
  login: "/signin",
  registration: "/signup",
  testAuth: "/getuser",
};

export function loginSuccess() {
  return {
    type: types.LOG_IN_SUCCESS
  };
}
export function registrationSuccess() {
  return {
    type: types.REGISTRATION_SUCCESS
  };
}

export function loginUser(credentials) {
  return function(dispatch) {
    return fetch(urls.login, {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Access-Control-Request-Headers": "x-requested-with",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jwt => {
        if (jwt.token) {
          authApi.setToken(jwt.token);
          dispatch(loginSuccess());
        } else {
          return Promise.reject(jwt);
        }
      });
  };
}

export function registrationUser(data) {
  return function(dispatch) {
    return fetch(urls.registration, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Access-Control-Request-Headers": "x-requested-with",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jwt => {
        if (jwt.token) {
          authApi.setToken(jwt.token);
          dispatch(loginSuccess());
        } else {
          return Promise.reject(jwt);
        }
      });
  };
}

export function testAuth() {
  return function(dispatch) {
    return fetch(urls.testAuth, {
      method: "POST",
      headers: {
        "Access-Control-Request-Headers": "x-requested-with",
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(jwt => {
        if (jwt.token) {
          sessionStorage.setItem("jwt", jwt.token);
          dispatch(loginSuccess());
        } else {
          return Promise.reject(jwt);
        }
      });
  };
}

export function logOutUser() {
  return { type: types.LOG_OUT };
}

export function sitelogOut() {
  authApi.deleteToken();
  return dispatch => {
    dispatch(clearUserData());
    dispatch(logOutUser());
  };
}
