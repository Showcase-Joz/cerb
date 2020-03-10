import api from "../../services/api";

export const namespaced = true;

export const state = {
  currentNamespaces: null,
  selectedNamespace: ""
};

export const getters = {
  currentNamespaces: state => {
    return state.currentNamespaces;
  },
  selectedNamespace: state => {
    return state.selectedNamespace;
  }
};

export const mutations = {
  CURRENT_NAMESPACES(state, namespaces) {
    state.currentNamespaces = namespaces;
  },
  SELECTED_NAMESPACE(state, selectedNS) {
    state.selectedNamespace = selectedNS;
  }
};

export const actions = {
  async getNS({ commit, dispatch }, payload) {
    await dispatch("updateLoading", true, { root: true });
    await api.get(payload).then(response => {
      if (response.status === 200) {
        setTimeout(() => {
          commit("CURRENT_NAMESPACES", response.data.namespaces);
          dispatch("updateLoading", false, { root: true });
        }, 500);
      } else if (response.status !== 200) {
        commit("CURRENT_NAMESPACES", null);
      }
    }),
      err => {
        console.log("Error: ", err);
      };
  },
  async selectNS({ commit }, payload) {
    await commit("SELECTED_NAMESPACE", payload);
  }
};
