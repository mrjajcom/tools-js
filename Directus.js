import {authentication, createDirectus, readItems, refresh, rest, staticToken} from "@directus/sdk";
import {reactive} from "vue";
import {Auth} from "./Auth";
import {Utils} from "./Utils";
import {Urls} from "@/tools/Urls";


/**
 * Directus SDK usage
 * @constructor
 */
export function Directus() {
}

/**
 * Create object
 */
Directus.factory = function () {
  const object = new Directus();
  object.setClient()
  return object;
}

/**
 * Create object
 * @return Directus
 */
Directus.reactive = function (...params) {
  return reactive(Directus.factory(...params));
}

/**
 * Loading
 * @type {boolean}
 */
Directus.prototype.loading = false;

/**
 * Response result
 * @type {*}
 */
Directus.prototype.response = null;

/**
 * Client
 * @type {DirectusClient<any> & RestClient<Schema>}
 */
Directus.prototype.client = null;

/**
 * Set client with rest
 * @returns {DirectusClient<any> & RestClient<Schema>}
 */
Directus.prototype.setClient = function () {
  console.error(Urls.api())
  this.client = createDirectus(Urls.api());
  return this.client;
}

/**
 * Send request
 * @param params
 */
Directus.prototype.request = async function (...params) {
  return await this._send(async () => {
      return await this.client
        .with(rest())
        .request(...params)
    }
  )
}

/**
 * Send login request
 * @param params
 */
Directus.prototype.login = async function (...params) {
  return await this._send(async () => {
      const response = await this.client
        .with(authentication('json'))
        .with(rest())
        .login(...params)
      this._setAuth(response)
      return response;
    }
  )
}

/**
 * Refresh token
 */
Directus.prototype.refresh = async function () {
  return await this._send(async () => {
      const response = await this.request(refresh('json', Auth.getRefreshToken()))
      this._setAuth(response)
      return response;
    }
  )
}

/**
 * Add with auth to client
 */
Directus.prototype.withAuth = function () {
  this.client = this.client.with(staticToken(Auth.getToken()))
  return this;
}

/**
 * Get items request
 * @param collection*
 * @param params
 */
Directus.prototype.getItems = async function (collection, params = {}) {
  return await this.request(readItems(collection, params))
}

/**
 * Reset request data
 */
Directus.prototype.reset = function () {
  this.loading = false;
  this.response = null;
}

/**
 * Check has data in response
 */
Directus.prototype.hasData = function () {
  return !!this.response
}

// Privates *****

/**
 * Send request and set loading
 * @private
 */
Directus.prototype._send = async function (method) {
  try {
    this.loading = true;
    this.response = await method();
    this.loading = false;
    return this.response;
  } catch (e) {
    this.reset()
    Utils.devLog(e)
  }
}

/**
 * Set auth data
 * @private
 */
Directus.prototype._setAuth = function (response = null) {
  if (!response) response = this.response
  if (!Utils.isObject(response) || !response?.access_token) return;
  Auth.setToken(response?.access_token)
  Auth.setExpiration(response?.expires)
  Auth.setRefreshToken(response?.refresh_token)
};
