import store from "@/store";
import { _t } from "./Utils";

// Message
// display a quick message to user

const message = {
  error(text) {
    store.commit("setMessage", { text: text, color: "error" });
  },

  success(text) {
    store.commit("setMessage", { text: text, color: "success" });
  },

  show(text) {
    store.commit("setMessage", { text: text, color: "default" });
  },
};

export default message;
