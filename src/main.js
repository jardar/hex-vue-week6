import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/all.scss";

import { defineRule, Form, Field, ErrorMessage, configure } from "vee-validate";
import { required, email, min, digits } from "@vee-validate/rules";
import { localize, loadLocaleFromURL } from "@vee-validate/i18n";

defineRule("required", required);
defineRule("email", email);
defineRule("min", min);
defineRule("digits", digits);

defineRule("cellphone", (value) => {
  if (!value || !value.length) {
    return "台灣手機號必填";
  }

  const res = value.match(/^(09)[0-9]{8}$/) ? true : false;
  if (!res) {
    return "格式錯誤。台灣手機號 09xxxxxxxx";
  }
  return true;
});

loadLocaleFromURL(
  "https://unpkg.com/@vee-validate/i18n@4.1.0/dist/locale/zh_TW.json"
);

configure({
  generateMessage: localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("VForm", Form);
app.component("VField", Field);
app.component("ErrorMessage", ErrorMessage);
app.component("MyLoading", Loading);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
