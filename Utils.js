import Trans from "./Trans";

/**
 * Utils
 * general and useful functions to project.
 */

export function _t(key, lang = '') {
    return Trans.message(key, lang);
}

// Set string parameters
export function set_string_parameters(string, params) {
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

Number.prototype.customFormat = function (n, x, s, c) {
    let re = "\\d(?=(\\d{" + (x || 3) + "})+" + (n > 0 ? "\\D" : "$") + ")",
        num = this.toFixed(Math.max(0, ~~n));
    return (c ? num.replace(".", c) : num).replace(
        new RegExp(re, "g"),
        "$&" + (s || ",")
    );
};

export function formatNumber(number, fa = true, split = true) {
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

export function uniqueArray(array, key = "id") {
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

export function calculateFileSize(bytes) {
    try {
        let sizes = ["Bytes", "KB", "MB", "GB", "TB"];
        if (!bytes || bytes == 0) return "0 Byte";
        let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
        return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
    } catch (e) {
        return "0 Byte";
    }
}

export function getFileExtension(path) {
    if (!path) return;
    return path.split(".").pop();
}
