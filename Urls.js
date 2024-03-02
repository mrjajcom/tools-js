import {Utils} from "./Utils";

/**
 * Urls Class
 * this class handle all urls and apis address
 */
export function Urls() {
  //
}

/**
 * Api and urls data
 * @type {{}}
 */
Urls.data = {
  // dev_api_base_url: '...',
  // api_base_url: '...',
  // ...
}

/**
 * Init urls data
 * @param app
 * @param data
 */
Urls.init = function (app, data) {
  this.data = data;
}

/**
 * Urls request with base url
 * @param key
 * @param parameters
 * @returns {*}
 */
Urls.api = function (key = null, parameters = []) {
  const dev_base_url = this.data['dev_api_base_url'];
  const base = Utils.isDev() && dev_base_url ? dev_base_url : this.data['api_base_url'];
  if (!key) return base;
  return base + this.get(key, parameters);
}

/**
 * Get url without base url
 */
Urls.get = function (key, parameters = []) {
  try {
    if (!Array.isArray(parameters)) parameters = [];
    let url = this.data[key];
    if (parameters.length !== 0) url = Utils.setStringParameters(url, parameters);
    return url ?? '';
  } catch (e) {
    Utils.devLog(e)
    return '';
  }
}
