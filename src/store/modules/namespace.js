import api from "../../services/api";

export const namespaced = true;

export const state = {
  loading: false,
  currentNamespaces: null
}

export const getters = {
  currentNamespaces: state => {
    return state.currentNamespaces;
  }
}

export const mutations = {
  CURRENT_NAMESPACES(state, namespaces) {
    state.currentNamespaces = namespaces
  }
}

export const actions = {
  async getNS({ commit, dispatch }, payload) {
    dispatch("updateLoading", true);
    await api.get(payload)
      .then(response => {
        if (response.status === 200) {
          dispatch("updateLoading", false);
          commit("CURRENT_NAMESPACES", response.data.namespaces);
        } else if (response.status !== 200) {
          commit("CURRENT_NAMESPACES", null);
        }
      }),
      err => {
        console.log("Error: ", err);
      }
  },
  // send loadingState to root store for processing
  updateLoading({ dispatch }, payload) {
    dispatch("testAction", payload, { root: true });
  }
}