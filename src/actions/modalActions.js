import * as types from "./actionTypes";

export const showModal = (modalType, data) => {
  return {
    type: types.SHOW_MODAL,
    data,
    modalType
  };
};

export const hideModal = () => {
  return {
    type: types.HIDE_MODAL
  };
};
