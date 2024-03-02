import axios from "axios";
import handler from "./Handler";
import auth from "./Auth";
import Trans from "./Trans";

const api = axios.create({});

api.defaults.withCredentials = true;
api.interceptors.request.use(
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
api.interceptors.response.use(
    async (response) => {
        return handler.response(response);
    },
    async (error) => {
        return handler.error(error);
    }
);

export default api;
