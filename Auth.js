import storage from "./Storage";

/**
 *  Auth Class
 *  this class handle user info and user
 *  @constructor
 */
export function Auth() {

}

/**
 * Storage keys
 * @type {*}
 */
Auth.storage_keys = {
  USER: "@auth_user:user_info",
  TOKEN: "@auth_user:token",
  REFRESH_TOKEN: "@auth_user:refresh_token",
  EXPIRATION: "@auth_user:expiration_date",
}

/**
 * Save current user info to local storage
 */
Auth.setUser = function (value) {
  storage.set(this.storage_keys.USER, value)
}

/**
 * Get current user info from local storage
 * @returns {*}
 */
Auth.getUser = function () {
  return storage.get(this.storage_keys.USER)
}

/**
 * Save token
 */
Auth.setToken = function (token) {
  storage.set(this.storage_keys.TOKEN, token);
}

/**
 * This method get user token on local storage
 * @returns {*}
 */
Auth.getToken = function () {
  return storage.get(this.storage_keys.TOKEN);
}

/**
 *  This method save user refresh token on local storage
 * @param refresh_token
 */
Auth.setRefreshToken = function (refresh_token) {
  storage.set(this.storage_keys.REFRESH_TOKEN, refresh_token);
}

/**
 * Get refresh token
 */
Auth.getRefreshToken = function () {
  return storage.get(this.storage_keys.REFRESH_TOKEN);
}

/**
 * Save expiration date
 */
Auth.setExpiration = function (data) {
  storage.set(this.storage_keys.EXPIRATION, data);
}

/**
 * Get expiration date
 */
Auth.getExpiration = function () {
  return storage.get(this.storage_keys.EXPIRATION);
}

/**
 * This method get user token on local storage
 */
Auth.isLogin = function () {
  let token = this.getToken();
  return token != null && token !== "" && token !== undefined;
}

/**
 * This method remove token and all user data from local storage
 */
Auth.logout = function () {
  try {
    Object.keys(this.storage_keys)?.forEach((key) => storage.remove(key))
  } catch (e) {
    console.log(e);
  }
}
