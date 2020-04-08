import api from "../../services/api";
import store from "../store";

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
    // dispatch("updateLoading", true, { root: true });
    dispatch("spinner", true, { root: true });
    await api.delete(payload).then(response => {
      if (response.status === 200) {
        commit("CURRENT_DELETE", payload);
        // commit("namespace/SELECTED_NAMESPACE", "", { root: true });
        commit("createItem/CLEAR_NS", "", { root: true });
        setTimeout(() => {
          dispatch("updateShowModal", false, { root: true });
          dispatch("spinner", false, { root: true });
        }, 1500);
      } else if (response.status !== 200) {
        commit("CURRENT_DELETE", "");
        dispatch("updateVerifyModal", store.state.verifyError, { root: true });
      }
    }),
      err => {
        console.log("Error: ", err);
        dispatch("spinner", false, { root: true });
        setTimeout(() => {
          dispatch("updateShowModal", false, { root: true });
        }, 1500);
      };
  }
};
