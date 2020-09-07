export const namespaced = true;

export const state = {
  searchedContent: "",
  storedNS: "",
  storedN: "",
  storedE: ""
};

export const getters = {
  searchedContent: state => {
    return state.searchedContent;
  },
  storedNS: state => {
    return state.storedNS;
  },
  storedN: state => {
    return state.storedN;
  },
  storedE: state => {
    return state.storedE;
  }
};

export const mutations = {
  SEARCH_STRING(state, string) {
    state.searchedContent = string;
  },
  STORE_NS(state, value) {
    state.storedNS = value;
  },
  STORE_N(state, value) {
    state.storedN = value;
  },
  STORE_E(state, value) {
    state.storedE = value;
  }
};

export const actions = {
  storedSearch({ commit }, payload) {
    commit("SEARCH_STRING", payload);
    if (payload.length === 0) {
      commit("events/CLEAR_FILTERED", null, { root: true });
    }
  },
  storedNS({ commit }, payload) {
    commit("STORE_NS", payload);
  },
  storedN({ commit }, payload) {
    commit("STORE_N", payload);
  },
  storedE({ commit }, payload) {
    commit("STORE_E", payload);
  }
};
