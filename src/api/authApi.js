import { KEY_JWT } from "./storageConstants";

class authApi {
  static hasSessionToken() {
    return !!sessionStorage.getItem(KEY_JWT);
  }
  static setToken(token) {
    sessionStorage.setItem(KEY_JWT, token);
  }
  static deleteToken() {
    sessionStorage.removeItem(KEY_JWT);
  }
}

export default authApi;
