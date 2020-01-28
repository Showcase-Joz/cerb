import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import { store } from "./store/store";
import Vuelidate from "vuelidate";
import VueResource from "vue-resource";
import Amplify from "aws-amplify";
// import { AmplifyPlugin } from "aws-amplify-vue";
import awsExports from "./aws-exports";

Amplify.configure(awsExports);

Vue.use(Vuelidate);
Vue.use(VueResource);
Vue.use(Amplify);

Vue.http.options.root = "https://typhon-api.sst-l.com/";

<<<<<<< HEAD
Vue.http.options.root = "https://typhon-api.sst-l.com/";
=======
>>>>>>> master
Vue.http.options.headers = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  // created() {
  //   const userString = localStorage.getItem("user")
  //   if (userString) {
  //     const userData = JSON.parse(userString);
  //     this.$store.commit("SET_USER_DATA", userData)
  //   }
  // },
  render: h => h(App)
}).$mount("#app");
