import api from "../../services/api";

export const namespaced = true;

export const state = {
  postString: null,
  responseData: null
};

export const getters = {
  postString: state => {
    return state.postString;
  },
  responseData: state => {
    return state.responseData;
  }
};

export const mutations = {
  UPDATE_POST_STRING(state, object) {
    state.postString = object;
  },
  RESPONSE_DATA(state, object) {
    state.responseData = object;
  }
};

export const actions = {
  async sendString({ commit, dispatch }, payload) {
    await dispatch("updateLoading", true, { root: true });
    await api.post("events", payload).then(response => {
      if (response.status === 201) {
        commit("UPDATE_POST_STRING", payload);
        commit("RESPONSE_DATA", response.data);
        dispatch("updateLoading", false, { root: true });
      } else if (response.status !== 201) {
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
