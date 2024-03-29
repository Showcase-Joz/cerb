import Vue from "vue";
import Vuex from "vuex";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router/routes";
import store from "./store/store";
import api from "./services/api";
import Vuelidate from "vuelidate";
import VueNumber from "vue-number-animation";

Vue.use(Vuex);
Vue.use(Vuelidate);
Vue.use(VueNumber);

// allows the use of Axios in components as this.$http.get(...)
Vue.prototype.$http = api;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
