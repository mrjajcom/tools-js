import axios from "axios";
import handler from "./Handler";
import auth from "./Auth";
import Trans from "./Trans";

const request = axios.create({});

request.defaults.withCredentials = true;
request.interceptors.request.use(
    (request) => {

        if (Trans.getLang()) request.headers.common["Accept-Language"] = Trans.getLang();

        //Auth token if token exist,set it on header request
        let token = auth.getToken();
        if (token) request.headers.common["Authorization"] = `Bearer ${token}`;
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// response and error handler
request.interceptors.response.use(
    async (response) => {
        return handler.response(response);
    },
    async (error) => {
        return handler.error(error);
    }
);

export default request;
