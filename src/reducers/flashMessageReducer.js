import * as types from "../actions/actionTypes";
import initialState from "./initialState";
export default function flashMessageReducer(
  state = initialState.flashMessage,
  action
) {
  switch (action.type) {
    case types.ADD_FLASH_MESSAGE:
      return { text: action.text, open: true };
    case types.CLOSE_FLASH_MESSAGE:
      return { text: "", open: false };
    default:
      return state;
  }
}
