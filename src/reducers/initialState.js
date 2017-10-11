import authApi from "../api/authApi";
import { KEY_FAVORITES } from "../api/storageConstants";

const favorites = JSON.parse(localStorage.getItem(KEY_FAVORITES));
export default {
  course: {
    isFetching: false,
    courses: [],
    lastId: 0,
    updatedAt: null,
    favorites: favorites || []
  },
  userdata: {
    isFetching: false,
    courses: [],
    edit: 0
  },
  session: authApi.hasSessionToken(),
  flashMessage: {
    text: "",
    open: false
  },
  modal: {
    modalType: undefined,
    data: null,
    open: false
  }
};
