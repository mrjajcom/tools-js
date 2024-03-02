import storage from "./Storage";

/**
 * Application Class
 * this class handle app control and settings
 */

const app = {
  app_name: "Renotive",
  supper_key: "@app_system:",
  currency: "$",
  fonts: {
    en: "Raleway, sans-serif !important;",
    fa: "Tahoma, sans-serif !important;",
  },
  roles: {
    admin: "ec5d18b5-047b-4ab5-b7f8-a089bd8be43a",
    client: "3448c9ef-6456-4cad-8015-87a4e8fe1c31",
    pro: "ebe9313f-150a-4331-98bf-af294eec69cf",
    lead: "8fca94dc-fd48-41c5-bdd9-54dad489459a",
    project_manager: "7b7b4950-eac7-48b6-a909-2a15528e7ce5",
    supper_admin: "6db3e6b6-fd30-46e6-aa7a-3dcfcc57b0c4",
    blog: "d515a2c0-5342-4ccd-83bb-1538e45ba7a7",
  },
  default_lang: "fa",
  test_data: false,
  languages: ["fa", "en"],
  limit: 24,
  search_keyword_length: 3,
  rtl_lang: ["fa"],
  lang_items: [
    {
      key: "sv",
      title: "svenska",
    },
    {
      key: "en",
      title: "English",
    },
  ],

  // load data with key
  default_image:  null,
  load(key) {
    return storage.get(this.supper_key + key);
  },

  // Save data with key
  save(key, value) {
    storage.set(this.supper_key + key, value);
  },
};

export default app;
