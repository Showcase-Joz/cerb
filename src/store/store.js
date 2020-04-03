import Vue from "vue";
import Vuex from "vuex";
import * as authorisation from "./modules/authorisation.js";
import * as appInfo from "./modules/appInfo";
import * as post from "./modules/post";
import * as search from "./modules/search";
import * as namespace from "./modules/namespace";
import * as name from "./modules/name";
import * as events from "./modules/events";
import * as createItem from "./modules/create";
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
    // user: null,
    loading: false,
    noticeMessage: null,
    showNotice: false,
    showModal: true
  },
  getters: {
    loading: state => {
      return state.loading;
    },
    noticeMessage: state => {
      return state.noticeMessage;
    },
    showNotice: state => {
      return state.showNotice;
    },
    showModal: state => {
      return state.showModal;
    }
  },
  mutations: {
    LOADING_STATE(state, boolean) {
      state.loading = boolean;
    },
    NOTICE_MESSAGE(state, notice) {
      if (notice === null) {
        store.commit("SHOW_NOTICE", false);
      } else {
        state.noticeMessage = notice;
      }
    },
    SHOW_NOTICE(state, boolean) {
      state.showNotice = boolean;
    },
    SHOW_MODAL(state, boolean) {
      state.showModal = boolean;
    }
  },
  actions: {
    updateLoading({ commit }, payload) {
      commit("LOADING_STATE", payload);
    },
    updateNotice({ commit }, payload) {
      commit("NOTICE_MESSAGE", payload);
    },
    updateShowNotice({ commit }, payload) {
      commit("SHOW_NOTICE", payload);
    },
    updateShowModal({ commit }, payload) {
      commit("SHOW_MODAL", payload);
    }
  },
  modules: {
    authorisation,
    appInfo,
    post,
    search,
    namespace,
    name,
    events,
    createItem,
    deletedItem
  }
});

export default store;
