import * as types from "./actionTypes";

export const addFlashMessage = text => {
  return {
    type: types.ADD_FLASH_MESSAGE,
    text
  };
};

export const closeFlashMessage = () => {
  return {
    type: types.CLOSE_FLASH_MESSAGE
  };
};
