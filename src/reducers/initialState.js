import authApi from "../api/authApi";

const favorites = JSON.parse(localStorage.getItem("favorites"));
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
