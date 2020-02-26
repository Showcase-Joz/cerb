import Vue from "vue";
import Vuex from "vuex";
import * as authorisation from "./modules/authorisation.js";
import * as appInfo from "./modules/appInfo";
import * as search from "./modules/search";

Vue.use(Vuex);

/* 
  for user deletion install the below and work it out.
  though deleteUser should be part of user management NOT user Auth
  https://github.com/aws-amplify/amplify-js/issues/469
  import { CognitoUser } from "amazon-cognito-identity-js"; 
*/

const store = new Vuex.Store({
  namespaced: true,
  state: {
    // signedIn: false,
    // user: null

  },
  getters: {

  },
  mutations: {

  },
  actions: {

  },
  modules: {
    authorisation,
    appInfo,
    search
  }
});

export default store;