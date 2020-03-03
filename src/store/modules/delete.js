import api from "../../services/api";

export const namespaced = true;

export const state = {
  currentDelete: ""
};

export const getters = {
  currentDelete: state => {
    return state.currentDelete;
  }
};

export const mutations = {
  CURRENT_DELETE(state, beingDeleted) {
    state.currentDelete = beingDeleted;
  }
};

export const actions = {
  async deleteNS({ commit, dispatch }, payload) {
    dispatch("updateLoading", true, { root: true });
    await api.delete(payload).then(response => {
      if (response.status === 200) {
        dispatch("updateLoading", false, { root: true });
        commit("CURRENT_DELETE", payload);
      } else if (response.status !== 200) {
        commit("CURRENT_DELETE", "");
      }
    }),
      err => {
        console.log("Error: ", err);
      };
  }
};
