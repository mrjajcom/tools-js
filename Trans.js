import {createI18n} from "vue-i18n";

/**
 * Translate and Multi-lang

 * Used i18n:
 * https://vue-i18n.intlify.dev/guide/
 */

export function Trans() {

}

/**
 * Multi-lang provider
 * @type {null}
 */
Trans.provider = null;

/**
 * Init tools
 * @param app
 * @param configs
 */
Trans.init = function (app, configs) {
  Trans.provider = createI18n(configs)
  app?.use(Trans.provider)
}


export default Trans;
