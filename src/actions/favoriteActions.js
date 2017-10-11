import * as types from "./actionTypes";

export const addFavorite = id => {
  return {
    type: types.ADD_FAVORITE,
    id
  };
};

export const removeFavorite = id => {
  return {
    type: types.REMOVE_FAVORITE,
    id
  };
};

export const toggleFavorite = id => {
  return (dispatch, getState) => {
    const { favorites } = getState().course;
    const index = favorites.indexOf(id);
    if (index === -1) {
      dispatch(addFavorite(id));
    } else {
      dispatch(removeFavorite(id));
    }
  };
};
