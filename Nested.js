import Vue from "vue";

const nested = {

    /**
     * Set nested in object
     * @param object {object}
     * @param path_array {array, string, number}
     * @param value
     */
    set(object, path_array, value) {
        try {
            if(typeof path_array == "number") path_array = [path_array];
            if (typeof path_array == "string") path_array = path_array.split('.');

            const prop = path_array.shift()
            if (!object[prop]) {
                Vue.set(object, prop, {})
            }
            if (!path_array.length) {
                if (value && typeof value === 'object' && !Array.isArray(value)) {
                    object[prop] = {...object[prop], ...value}
                } else {
                    object[prop] = value
                }
                return
            }
            this.set(object[prop], path_array, value)
        } catch (e) {
            console.log(e);
        }
    },

    /**
     * Get nested value from object
     * @param object {object}
     * @param path_array {array, string}
     * @returns {*}
     */
    get(object, path_array) {
        if(typeof path_array == "number") path_array = [path_array];
        if (typeof path_array == "string") path_array = path_array.split('.');
        const prop = path_array.shift()
        if (!object[prop] || !path_array.length) {
            return object[prop]
        }
        return this.get(object[prop], path_array)
    },

    /**
     * Delete nested value from object
     * @param object {object}
     * @param path_array {array, string}
     * @returns {*}
     */
    delete (object, path_array) {
        if(typeof path_array == "number") path_array = [path_array];
        if (typeof path_array == "string") path_array = path_array.split('.');
        const prop = path_array.shift()
        if (!object[prop]) {
            return
        }
        if (!path_array.length) {
            Vue.delete(object, prop)
            return
        }
        this.delete(object[prop], path_array)
    }

}

export default nested;