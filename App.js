import {Urls} from "@/tools-js/Urls";

/**
 * App
 * Used for set and get configs.
 * @constructor
 */
export function App() {
}

/**
 * All configs
 * @type {{}}
 */
App.data = {
  // ...
}

/**
 * Default app configs
 * @type {{app: {name: string}, urls: {base_url: string}}}
 */
App.default_configs = {
  app: {
    name: 'My Application',
  },

  urls: {
    base_url: '...'
  }
}

/**
 * Init tools
 * @param configs {{app?: *, urls?: *}}
 */
App.init = function (configs) {
  const options = {...this.default_configs, ...configs};
  this.data = options?.app;
  Urls.init(options?.urls)
}

/**
 * Set configs
 * @param key
 * @param data
 */
App.set = function (key, data) {
  this.data[key] = data;
}


/**
 * Set configs
 * @param key Nested string with '.', Array or simple key
 * @param data
 */
App.get = function (key, data) {
  this.data[key] = data;
}

