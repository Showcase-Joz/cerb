import api from "../../services/api";
import * as Name from "../modules/name";

export const namespaced = true;

export const state = {
  currentEvents: null,
  totalEvents: ""
};

export const getters = {
  currentEvents: state => {
    return state.currentEvents;
  },
  totalEvents: state => {
    return state.totalEvents;
  }
};

export const mutations = {
  CURRENT_EVENTS(state, events) {
    const sortedEvents = events.sort((a, b) =>
      a.event.created < b.event.created ? 1 : -1
    );
    state.currentEvents = sortedEvents;
  },
  TOTAL_EVENTS(state, number) {
    state.totalEvents = number;
  },
  CLEAR_DATA(state) {
    state.currentEvents = null;
    state.totalEvents = "";
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
        commit("TOTAL_EVENTS", response.data.total);
        setTimeout(() => {
          commit("CURRENT_EVENTS", response.data.events);
          dispatch("updateLoading", false, { root: true });
        }, 100);
      } else if (response.status !== 200) {
        commit("TOTAL_EVENTS", "");
        commit("CURRENT_EVENTS", null);
      }
    }),
      await dispatch("updateNotice", null, { root: true });
    err => {
      console.log("Error: ", err);
    };
  },
  clearData({ commit }) {
    commit("CLEAR_DATA");
  }
};
