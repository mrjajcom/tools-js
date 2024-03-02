import {Urls} from "@/tools/Urls";
import Trans from "@/tools/Trans";

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
 * @param app {createApp}
 * @param configs {{app?: *, urls?: *}}
 */
App.init = function (app, configs) {
  const options = {...this.default_configs, ...configs};
  this.data = options?.app;

  // Add new tools init here
  Urls.init(app, options?.urls)
  Trans.init(app, options?.trans)
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
 * @return *
 */
App.get = function (key) {
  return this.data[key];
}

