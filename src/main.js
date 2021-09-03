import Vue from "vue";
import App from "./App.vue";
import vuetify from "@/plugins/vuetify";
// import "./registerServiceWorker";
import router from "./router";
import "material-design-icons-iconfont/dist/material-design-icons.css";
import axios from "axios";

Vue.prototype.$http = axios;
Vue.prototype.$api = "https://reqres.in/api";

Vue.config.productionTip = false;

new Vue({
  vuetify,
  router,
  render: (h) => h(App),
}).$mount("#app");
