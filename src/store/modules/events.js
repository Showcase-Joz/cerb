import api from "../../services/api";
import * as Name from "../modules/name";

export const namespaced = true;

export const state = {
  currentEvents: null
};

export const getters = {
  currentEvents: state => {
    return state.currentEvents;
  }
};

export const mutations = {
  CURRENT_EVENTS(state, events) {
    state.currentEvents = events;
  }
};

export const actions = {
  async getEvents({ commit, dispatch }, payload) {
    await dispatch("updateLoading", true, { root: true });
    await dispatch(
      "updateNotice",
      {
        code: "valid",
        message: `Gathering the events inside the ${Name.state.selectedName} name`
      },
      { root: true }
    );
    await api.get(payload).then(response => {
      if (response.status === 200) {
        setTimeout(() => {
          commit("CURRENT_EVENTS", response.data);
          dispatch("updateLoading", false, { root: true });
        }, 500);
      } else if (response.status !== 200) {
        commit("CURRENT_EVENTS", null);
      }
    }),
      err => {
        console.log("Error: ", err);
      };
  }
};
