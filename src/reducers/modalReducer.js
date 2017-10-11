import * as types from "../actions/actionTypes";
import initialState from "./initialState";
export default function flashMessageReducer(
  state = initialState.modal,
  action
) {
  switch (action.type) {
    case types.SHOW_MODAL:
      return { modalType: action.modalType,data:action.data, open: true };
    case types.HIDE_MODAL:
      return { modalType: undefined,data:null, open: false };
    default:
      return state;
  }
}
