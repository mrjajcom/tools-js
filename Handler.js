/**
 *  Handler
 * handle server or connection errors
 */


import auth from "./Auth";
import message from "./Message";

const handler = {
    counter: 0,

    // handle errors
    error(result) {
        try {
            // token expired error
            if (result.response.status === 403) {
                if (auth.check()) {
                    if (3 < this.counter) {
                        this.counter = 0;
                        auth.removeToken();
                        window.location.reload();
                        return result;
                    }
                    this.counter++;
                }
            }

            message.error(this._getErrorMessage(result));
            return result;
        } catch (e) {
            return result;
        }
    },

    // handle response
    response(result) {
        try {
            if (!result.data) return null;
            return result.data;
        } catch (e) {
            return null;
        }
    },

    _getErrorMessage(result, key = 0) {
        try {
            return result.response.data.errors[key].message
        } catch (e) {
            return null;
        }
    }
};

export default handler;
