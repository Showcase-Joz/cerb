import api from "../../services/api";
import * as Created from "../modules/create";

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
        }, 100);
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
  },
  async createNamespace({ dispatch }, payload) {
    await api.put(payload).then(response => {
      if (response.status === 201) {
        dispatch("createItem/subStringNS", payload, { root: true })
      } else {
        dispatch(
          "updateNotice",
          {
            code: "invalid",
            message: `Failed to create ${Created.state.createdNamespace}`
          },
          { root: true }
        );
      }
    })
  }
};
