import storage from "./Storage";

/**
 *  Auth Class
 *  this class handle user info and user
 */

const auth = {
  supper_key: "@auth_user:",

  // Set user info
  setUserInfo(value) {
    storage.set(this.supper_key + "user_info", value);
  },

  // Get user info
  getUserInfo() {
    return storage.get(this.supper_key + "user_info");
  },

  // This method save user token
  // on database
  saveToken(token) {
    storage.set(this.supper_key + "token", token);
  },

  // This method save user refresh token
  // on database
  saveRefreshToken(refresh_token) {
    storage.set(this.supper_key + "refresh_token", refresh_token);
  },

  saveExpiration(data) {
    storage.set(this.supper_key + "expiration", data);
  },
  saveCafeLicenseExpiration(data) {
    storage.set(this.supper_key + "cafe_license_expiration", data);
  },

  // This method get user token
  // on database
  getToken() {
    return storage.get(this.supper_key + "token");
  },

  getRefreshToken() {
    return storage.get(this.supper_key + "refresh_token");
  },

  getExpiration() {
    return storage.get(this.supper_key + "expiration");
  },
  getCafeLicenseExpiration() {
    return storage.get(this.supper_key + "cafe_license_expiration");
  },

  // This method get user token
  // on database
  check() {
    let token = this.getToken();
    return token != null && token !== "" && token !== undefined;
  },

  // This method remove token and all user data
  // of database
  removeToken() {
    storage.remove(this.supper_key + "user_info");
    storage.remove(this.supper_key + "token");
    storage.remove(this.supper_key + "refresh_token");
    storage.remove(this.supper_key + "expiration");
  },

  // This method remove token and all user data
  // of database
  clear() {
    this.removeToken();
  },
};

export default auth;
