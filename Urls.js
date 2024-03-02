/**
 * Urls Class
 * this class handle all urls and apis address
 */

const urls = {
    apiParamsSupperKey: "@api_params:",

    urls: {
        base_url: "https://appx.webkok.ir",
        download_pro_version: "https://appx.webkok.ir/download-pro-version",
        qr_url: "https://api.qrserver.com/v1/create-qr-code/?size=%sx%s&data=%s",

    },

    // Get api
    api(key, parameters = []) {
        return this.urls["base_url"] + this.url(key, parameters);
    },

    // Get url without base url
    url(key, parameters = []) {
        if (!Array.isArray(parameters)) parameters = [];
        let url = this.urls[key];
        if (parameters.length !== 0) url = this.set_url_parameters(url, parameters);
        return url;
    },

    // Set url parameters
    set_url_parameters(url, params) {
        try {
            params.forEach((param) => {
                url = url.replace('%s', param);
            })
            return url;
        } catch (e) {
            console.log();
            return url;
        }
    },
};

export default urls;
