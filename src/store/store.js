import Vue from "vue";
import Vuex from "vuex";
import * as authorisation from "./modules/authorisation.js";
import * as appInfo from "./modules/appInfo";
import * as post from "./modules/post";
import * as search from "./modules/search";
import * as namespace from "./modules/namespace";
import * as name from "./modules/name";
import * as events from "./modules/events";
import * as details from "./modules/details";
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
    spinner: false,
    noticeMessage: null,
    showNotice: false,
    showModal: false,
    verifyModal: null,
    verifyError: {
      modalState: true,
      actionName: "DELETE",
      actionID: "ERROR",
      modalOptions: {
        type: "warning",
        title: `An Error occurred!`,
        content: `An error occurred while trying to complete an action. Please try again or check the logs.`,
        leftAction: "UNDERSTOOD",
        leftActionConfirm: "Go Back",
        rightAction: "OK",
        rightActionConfirm: "OK"
      }
    }
  },
  getters: {
    loading: state => {
      return state.loading;
    },
    spinner: state => {
      return state.spinner;
    },
    noticeMessage: state => {
      return state.noticeMessage;
    },
    showNotice: state => {
      return state.showNotice;
    },
    showModal: state => {
      return state.showModal;
    },
    verifyModal: state => {
      return state.verifyModal;
    }
  },
  mutations: {
    LOADING_STATE(state, boolean) {
      state.loading = boolean;
    },
    SPINNER_STATE(state, boolean) {
      state.spinner = boolean;
    },
    NOTICE_MESSAGE(state, notice) {
      if (notice === null) {
        store.commit("SHOW_NOTICE", false);
        // state.noticeMessage = { code: "", message: "" };
      } else {
        state.noticeMessage = notice;
      }
    },
    SHOW_NOTICE(state, boolean) {
      state.showNotice = boolean;
    },
    SHOW_MODAL(state, boolean) {
      state.showModal = boolean;
    },
    VERIFY_MODAL(state, object) {
      state.verifyModal = object;
    }
  },
  actions: {
    updateLoading({ commit }, payload) {
      commit("LOADING_STATE", payload);
    },
    spinner({ commit }, payload) {
      commit("SPINNER_STATE", payload);
    },
    updateNotice({ commit }, payload) {
      commit("NOTICE_MESSAGE", payload);
    },
    updateShowNotice({ commit }, payload) {
      commit("SHOW_NOTICE", payload);
    },
    updateShowModal({ commit }, payload) {
      commit("SHOW_MODAL", payload);
    },
    updateVerifyModal({ commit }, payload) {
      commit("VERIFY_MODAL", payload);
      commit("SHOW_MODAL", payload.modalState);
    },
    resetModal({ commit }, payload) {
      commit("VERIFY_MODAL", payload);
      commit("SHOW_MODAL", false);
    },
    resetAction({ commit }) {
      setTimeout(() => {
        commit("SPINNER_STATE", false);
      }, 500);
      setTimeout(() => {
        commit("LOADING_STATE", false);
      }, 1000);
      setTimeout(() => {
        commit("NOTICE_MESSAGE", null);
      }, 1500);
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
    details,
    createItem,
    deletedItem
  }
});

export default store;
