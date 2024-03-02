/**
 * Utils
 * general and useful functions to project.
 */
export function Utils() {

}

/**
 * Remove string comments
 * @param string
 * @returns {*}
 */
Utils.removeComments = function (string) {
  return string.replace(/\/\*[\s\S]*?\*\/|(?<=[^:])\/\/.*|^\/\/.*/g, '').trim();//Strip comments
}

/**
 * Covert a string to function with eval
 * @param string
 * @returns {boolean|function}
 */
Utils.convertStringToFunction = function (string) {
  try {
    string = string.toString();
    if (!string.includes('(')) return false;
    string = Utils.removeComments(string);
    return eval(string);
  } catch (e) {
    console.log(e, string);
    return false;
  }
}

/**
 * Check string is function
 * @param string
 * @returns {Function|boolean}
 */
Utils.stringIsFunction = function (string) {
  try {
    if (!string || typeof string === 'function') return false;

    const method = Utils.convertStringToFunction(string);
    if (!method || typeof method !== 'function') return false;
    return method;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * Get method result from string handler
 * @param method
 * @param data
 * @returns {Promise<*|boolean|null>}
 */
Utils.getMethodResult = async function (method, data) {
  try {
    if (method === undefined || method === null || method === '') return null;
    if (typeof method === "boolean") return method;
    if (typeof method === "string") method = await Utils.stringIsFunction(method);
    if (typeof method === "function") return await method(data);
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
}

/**
 * Sleep
 * @returns {Promise<*|boolean|null>}
 * @param ms
 */
Utils.sleep = async function (ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Array push without duplicates
 *
 * @param array1
 * @param array2
 * @return any[]|null
 */
Utils.arrayPush = function (array1, array2) {
  try {
    return [...new Set(array1.concat(array2))]
  } catch (e) {
    return null;
  }
}

/**
 * Is Object
 * @returns {boolean}
 * @param data
 */
Utils.isObject = function (data) {
  try {
    return typeof data === "object" && Object.keys(data)?.length !== 0
  } catch (e) {
    return false;
  }
}

/**
 * Is Develop
 * @returns {boolean}
 */
Utils.isDev = function () {
  try {
    const host = window.location.hostname;
    return ['rev50.loc', 'localhost'].includes(host)
  } catch (e) {
    return false;
  }
}

/**
 * Is Array
 * @returns {boolean}
 * @param data
 */
Utils.isArray = function (data) {
  try {
    return Array.isArray(data) && data?.length !== 0
  } catch (e) {
    return false;
  }
}

/**
 * Is Array or object
 * @returns {boolean}
 * @param data
 */
Utils.isArrayOrObject = function (data) {
  try {
    return Utils.isArray(data) || Utils.isObject(data);
  } catch (e) {
    return false;
  }
}

/**
 * Is Element
 * @returns {boolean}
 * @param element
 */
Utils.isElement = function (element) {
  return element instanceof Element || element instanceof HTMLDocument;
}

/**
 * Is Function
 * @returns {boolean}
 * @param data
 */
Utils.isFunction = function (data) {
  try {
    return typeof data === 'function';
  } catch (e) {
    return false;
  }
}

/**
 * Set string parameters
 */
Utils.setStringParameters = function (string, params) {
  try {
    params.forEach((param) => {
      string = string.replace('%s', param);
    })
    return string;
  } catch (e) {
    console.log();
    return string;
  }
}

/**
 * Format number
 * @param number
 * @param fa
 * @param split
 * @returns {*|string}
 */
Utils.formatNumber = function (number, fa = true, split = true) {
  try {
    let addFormat = "";
    if (split)
      if (100000000000 <= number + 0) {
        number = number / 1000000;
        addFormat = " Million";
      }
    let str = parseInt(number, 10).customFormat(0, 3, ",") + addFormat;
    if (!fa) return str;
    return str;
  } catch (e) {
    console.log(e);
    return number;
  }
}

/**
 * Create unique array of object with a column
 * @param array
 * @param key
 * @returns {*|*[]}
 */
Utils.uniqueArray = function (array, key = "id") {
  try {
    let new_array = [];
    array.filter(function (item) {
      let result = new_array.findIndex((x) => x[key] === item[key]);
      if (result < 0) new_array.push(item);
    });
    return new_array;
  } catch (e) {
    return array;
  }
}

/**
 * Calculate file size
 * @param bytes
 * @returns {string}
 */
Utils.calculateFileSize = function (bytes) {
  try {
    let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (!bytes || bytes == 0) return "0 Byte";
    let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
  } catch (e) {
    return "0 Byte";
  }
}

/**
 * Get file extension
 * @param path
 * @returns {*}
 */
Utils.getFileExtension = function (path) {
  if (!path) return;
  return path.split(".").pop();
}


/**
 * Log if is Development mode
 */
Utils.devLog = function (error) {
  if (!this.isDev()) return;

  console.log('>>>>>>> DEV LOG:')
  console.dir(error)
}
