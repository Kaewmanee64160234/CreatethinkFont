import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";

import vue3GoogleLogin from "vue3-google-login";

createApp(App)
  .use(vue3GoogleLogin, {
    clientId: process.env.VUE_APP_GOOGLE_CLIENT_ID
  })
  .use(router)
  .use(createPinia())
  .mount("#app");
