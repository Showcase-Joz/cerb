export const namespaced = true;

export const state = {
  searchedContent: ""
};

export const getters = {
  searchedContent: state => {
    return state.searchedContent;
  }
};

export const mutations = {
  SEARCH_STRING(state, string) {
    state.searchedContent = string;
  }
};

export const actions = {
  storedSearch({ commit }, payload) {
    commit("SEARCH_STRING", payload);
  }
};
