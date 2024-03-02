import App from "./App";
import app from "./App";

// TranslateTools Class
// this class handel translate messages on app.
// that used of database tools for get default
// user lang.

const messages_array = require('../lang');

const getWord = (words, paths) => paths.reduce((rec, key) => (rec && rec[key]) || `#${key}#`, words);

const Trans = {

    // lang key
    lang_key: 'lang',

    // Get string translate
    message(key, lang = '') {
        if (lang === '') lang = this.getLang();
        const paths = key.split('.');
        const words = messages_array[lang];
        if (!words) return key;
        return getWord(words, paths);
    },

    getLang() {
        let lang = window[this.lang_key];
        if (lang === undefined || lang === '')
            lang = app.default_lang;
        return lang;
    },

    setLang(lang) {
        if (!lang) lang = App.default_lang;
        window[this.lang_key] = lang;
        App.setKey(this.lang_key, lang)
    },
};


export default Trans;


