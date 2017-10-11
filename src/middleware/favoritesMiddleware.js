import * as types from "../actions/actionTypes";
import { KEY_FAVORITES } from "../api/storageConstants";

// add favorites to storage
const favoritesMiddleware = store => next => action => {
  let result = next(action);
  if (
    action.type === types.ADD_FAVORITE ||
    action.type === types.REMOVE_FAVORITE
  ) {
    let { favorites } = store.getState().course;
    localStorage.setItem(KEY_FAVORITES, JSON.stringify(favorites));
  }
  return result;
};
export default favoritesMiddleware;
