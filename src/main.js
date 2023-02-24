import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueAxios from "vue-axios";

axios.defaults.withCredentials = false;
axios.defaults.baseURL = "https://denys-trial-task.quatrix.it/api/1.0";

axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      store.dispatch("LogOut");
      return router.push("/login");
    }
  }
});

Vue.config.productionTip = false;

import "@/styles/global.scss";

Vue.use(VueAxios, axios);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
