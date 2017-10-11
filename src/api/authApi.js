class authApi {
  static hasSessionToken() {
    return !!sessionStorage.getItem("jwt");
  }
  static setToken(token){
    sessionStorage.setItem("jwt", token);
  }
  static deleteToken(){
    sessionStorage.removeItem("jwt");
  }
}

export default authApi;
