import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store/store";
import Vuelidate from "vuelidate";
import VueResource from "vue-resource";
import Auth from "@aws-amplify/auth";
// import { AmplifyPlugin } from "aws-amplify-vue";
import awsExports from "./aws-exports";

Auth.configure(awsExports);

Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(Auth);

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
