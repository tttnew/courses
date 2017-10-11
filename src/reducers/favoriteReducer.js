import * as types from "../actions/actionTypes";
import initialState from "./initialState";
export default function courseReducer(state = initialState.favorites, action) {
  switch (action.type) {
    case types.ADD_FAVORITE:
      return [...state, action.id];
    case types.REMOVE_FAVORITE:
      return state.filter(a => a !== id);
      return state;
  }
}
