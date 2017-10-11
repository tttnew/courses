import { combineReducers } from "redux";
import course from "./courseReducer";
import session from "./sessionReducer";
import userdata from "./userdataReducer";
import modal from "./modalReducer";
import flashMessage from "./flashMessageReducer";
import { reducer as formReducer } from "redux-form";

const coursesApp = combineReducers({
  course,
  userdata,
  session,
  flashMessage,
  modal,
  form: formReducer
});

export default coursesApp;
