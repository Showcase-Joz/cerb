import api from "../../services/api";

export const namespaced = true;

export const state = {
  postString: {}
};

export const getters = {
  postString: state => {
    return state.postString;
  }
};

export const mutations = {
  UPDATE_POST_STRING(state, object) {
    state.postString = object;
  }
};

export const actions = {
  async sendString({ commit, dispatch }, payload) {
    await dispatch("updateLoading", true, { root: true });
    await api.post("events", payload).then(response => {
      if (response.status === 201) {
        commit("UPDATE_POST_STRING", payload);
        dispatch("updateLoading", false, { root: true });
      } else if (response.status !== 200) {
        console.log(response);

        console.log("we shit out with POST");
      }
    });
    await dispatch("updateNotice", null, { root: true });
    err => {
      console.log("Error: ", err);
    };
  }
};
