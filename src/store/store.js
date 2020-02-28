import Vue from "vue";
import Vuex from "vuex";
import * as authorisation from "./modules/authorisation.js";
import * as appInfo from "./modules/appInfo";
import * as search from "./modules/search";
import * as namespace from "./modules/namespace";
import * as deletedItem from "./modules/delete";

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
    loading: false
  },
  getters: {
    loading: state => {
      return state.loading;
    }
  },
  mutations: {
    LOADING_STATE(state, value) {
      setTimeout(() => {
        state.loading = value;
      }, 1000);
    }
  },
  actions: {
    updateLoading({ commit }, payload) {
      commit("LOADING_STATE", payload);       
    }
  },
  modules: {
    authorisation,
    appInfo,
    search,
    namespace,
    deletedItem
  }
});

export default store;
