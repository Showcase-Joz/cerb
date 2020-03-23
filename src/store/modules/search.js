export const namespaced = true;

export const state = {
  searchedContent: "",
  storedNS: "",
  storedN: ""
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
  }
};

export const actions = {
  storedSearch({ commit }, payload) {
    commit("SEARCH_STRING", payload);
  },
  storedNS({ commit }, payload) {
    commit("STORE_NS", payload);
  },
  storedN({ commit }, payload) {
    commit("STORE_N", payload);
  }
};
