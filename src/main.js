import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/routes";
import store from "./store/store";
import VueResource from "vue-resource";
import Vuelidate from "vuelidate";

Vue.use(Vuex);
Vue.use(VueResource);
Vue.use(Vuelidate);

Vue.http.options.root = "https://typhon-api.sst-l.com/";

Vue.http.options.headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
