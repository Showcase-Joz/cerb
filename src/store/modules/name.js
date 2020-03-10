import api from "../../services/api";
import * as NameSpace from "../modules/namespace";

export const namespaced = true;

export const state = {
  currentNames: null,
  selectedName: ""
};

export const getters = {
  currentNames: state => {
    return state.currentNames;
  },
  selectedName: state => {
    return state.selectedName;
  }
};

export const mutations = {
  CURRENT_NAMES(state, names) {
    state.currentNames = names;
  },
  SELECTED_NAME(state, selectedN) {
    state.selectedN = selectedN;
  }
};

export const actions = {
  async getN({ commit, dispatch }, payload) {
    await dispatch("updateLoading", true, { root: true });
    await dispatch(
      "updateNotice",
      {
        code: "valid",
        message: `Gathering you the names inside the ${NameSpace.state.selectedNamespace} namespace`
      },
      { root: true }
    );
    await api.get(payload).then(response => {
      if (response.status === 200) {
        setTimeout(() => {
          commit("CURRENT_NAMES", response.data.names);
          dispatch("updateLoading", false, { root: true });
        }, 500);
      } else if (response.status !== 200) {
        commit("CURRENT_NAMES", null);
      }
    }),
      err => {
        console.log("Error: ", err);
      };
  },
  async selectedN({ commit }, payload) {
    await commit("SELECTED_NAME", payload);
  }
};
