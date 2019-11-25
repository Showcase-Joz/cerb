import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import Vuelidate from "vuelidate";
import VueResource from "vue-resource";

Vue.use(Vuelidate);
Vue.use(VueResource);

Vue.http.options.root = "https://typhon-api.sst-l.com/events";
Vue.http.options.headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
