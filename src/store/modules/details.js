// import * as Events from "../modules/events";

export const namespaced = true;

export const state = {
  currentDetails: {},
  currentIndex: ""
};

export const getters = {
  currentDetails: state => {
    return state.currentDetails;
  },
  currentIndex: state => {
    return state.currentIndex;
  }
};

export const mutations = {
  CURRENT_DETAILS(state, payload) {
    state.currentDetails = payload.item;
    state.currentIndex = payload.index;
  }
};

export const actions = {
  async pushEventDetails({ commit, dispatch }, payload) {
    await dispatch("updateLoading", true, { root: true });
    commit("CURRENT_DETAILS", payload);
    setTimeout(() => {
      dispatch("updateLoading", false, { root: true });
    }, 2000);
    await dispatch("updateNotice", null, { root: true });
  }
};
