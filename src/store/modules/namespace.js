import api from "../../services/api";
import * as Created from "../modules/create";

export const namespaced = true;

export const state = {
  currentNamespaces: null,
  selectedNamespace: "",
  counts: {
    totalCount: "",
    count: ""
  }
};

export const getters = {
  currentNamespaces: state => {
    return state.currentNamespaces;
  },
  selectedNamespace: state => {
    return state.selectedNamespace;
  },
  counts: state => {
    return state.counts;
  }
};

export const mutations = {
  CURRENT_NAMESPACES(state, namespaces) {
    state.currentNamespaces = namespaces;
  },
  SELECTED_NAMESPACE(state, selectedNS) {
    state.selectedNamespace = selectedNS;
  },
  CURRENT_TOTALCOUNT(state, value) {
    state.counts.totalCount = value;
  },
  CURRENT_COUNT(state, value) {
    state.counts.count = value;
  }
};

export const actions = {
  async getNS({ commit, dispatch }, payload) {
    await dispatch("updateLoading", true, { root: true });
    await api.get(payload).then(response => {
      if (response.status === 200) {
        setTimeout(() => {
          commit("CURRENT_NAMESPACES", response.data.namespaces);
          commit("CURRENT_TOTALCOUNT", response.data.totalFound);
          commit("CURRENT_COUNT", response.data.count);
          dispatch("updateLoading", false, { root: true });
        }, 1000);
      } else if (response.status !== 200) {
        commit("CURRENT_NAMESPACES", null);
      }
    });
    await dispatch("updateNotice", null, { root: true });
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
        dispatch("createItem/subStringNS", payload, { root: true });
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
    });
  }
};
