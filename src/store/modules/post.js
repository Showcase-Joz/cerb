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
    await dispatch("spinner", true, { root: true });
    await dispatch("updateLoading", true, { root: true });
    await dispatch(
      "updateNotice",
      {
        code: "valid",
        message: "Posting new data to the API"
      },
      { root: true }
    );
    await api.post("events", JSON.stringify(payload))
      .then(response => {
        if (response.status === 201) {
          commit("UPDATE_POST_STRING", payload);
          commit("RESPONSE_DATA", response.data);
          setTimeout(() => {
            dispatch("updateNotice", null, { root: true });
            dispatch("updateLoading", false, { root: true });
            dispatch("spinner", false, { root: true });
          }, 1500);
        } else if (response.status !== 201) {
          dispatch(
            "updateNotice",
            {
              code: "invalid",
              message: "There was an ERROR posting to the API"
            },
            { root: true }
          );
          console.log(response);
          console.log("we shit out with POST");
        }
      })
      .catch(err => {
        console.log("Error: ", err);
      });
  }
};
