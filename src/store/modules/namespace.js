import api from "../../services/api";

export const namespaced = true;

export const state = {
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
    await dispatch("updateLoading", true, { root: true });
    await api.get(payload)
      .then(response => {
        if (response.status === 200) {
          setTimeout(() => {
            commit("CURRENT_NAMESPACES", response.data.namespaces);
            dispatch("updateLoading", false, { root: true });
          }, 2000);
        } else if (response.status !== 200) {
          commit("CURRENT_NAMESPACES", null);
        }
      }),
      err => {
        console.log("Error: ", err);
      }
    
  }
}