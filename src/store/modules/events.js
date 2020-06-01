import api from "../../services/api";
import * as Name from "../modules/name";

export const namespaced = true;

export const state = {
  currentEvents: null,
  filteredEvents: null,
  selectedEvent: "",
  moreEvents: "",
  totalEvents: ""
};

export const getters = {
  currentEvents: (state, getters, rootState) => {
    // checks searchedContent for a length > 0
    // if true; filters currentEvents that includes the searchedContent phrase
    // else displays all currentEvents
    return rootState.search.searchedContent.length > 0
      ? (state.filteredEvents = state.currentEvents.filter(events =>
        events.event.description.includes(rootState.search.searchedContent)
      ))
      : state.currentEvents;
  },
  selectedEvent: state => {
    return state.selectedEvent;
  },
  moreEvents: state => {
    return state.moreEvents;
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
    console.log("calling currEv", state.currentEvents);
  },
  SELECTED_EVENT(state, selectedE) {
    state.selectedEvent = selectedE;
  },
  MORE_EVENTS(state, nextItem) {
    state.moreEvents = nextItem;
  },
  APPEND_EVENTS(state, addEvents) {
    
    
    state.totalEvents = state.currentEvents.length + addEvents.length;
    const events = [...addEvents, ...state.currentEvents];
    const reSortedEvents = events.sort((a, b) => a.event.created < b.event.created ? 1 : -1
    );
    state.currentEvents = reSortedEvents;
    console.log("calling appEv", state.currentEvents);
  },
  TOTAL_EVENTS(state, number) {
    state.totalEvents = number;
  },
  CLEAR_CURRENT(state) {
    state.currentEvents = null;
    state.moreEvents = "";
    state.totalEvents = "";
  },
  CLEAR_FILTERED(state) {
    state.filteredEvents = null;
  }
};

export const actions = {
  async addEvents({ commit, dispatch }, payload) {
    console.log(payload);
    await api.get(payload).then(response => {
      if (response.status === 200) {        
        commit("TOTAL_EVENTS", response.data.total);
        if ("nextitem" in response.data) {
          commit("MORE_EVENTS", response.data.nextitem);
        } else {
          commit("MORE_EVENTS", "");
        }
        setTimeout(() => {
          commit("APPEND_EVENTS", response.data.events);
        }, 100);
      } else if (response.status !== 200) {
        commit("TOTAL_EVENTS", "");
        commit("CURRENT_EVENTS", null);
        commit("MORE_EVENTS", "");
        commit("APPEND_EVENTS", "");
      }
    }),
      await dispatch("updateNotice", null, { root: true });
    err => {
      console.log("Error: ", err);
    };
  },
  async getEvents({ commit, dispatch }, payload) {
    console.log(payload);
    await dispatch("updateLoading", true, { root: true });
    await dispatch(
      "updateNotice",
      {
        code: "valid",
        message: `Gathering the events inside the <strong id="msgStrong">${Name.state.selectedName}</strong> name`
      },
      { root: true }
    );
    await api.get(payload).then(response => {
      if (response.status === 200) {
        commit("TOTAL_EVENTS", response.data.total);
        if ("nextitem" in response.data) {
          commit("MORE_EVENTS", response.data.nextitem);
        } else {
          commit("MORE_EVENTS", "");
        }
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
  async selectE({ commit, dispatch }, payload) {
    await commit("SELECTED_EVENT", payload);
    await dispatch("search/storedSearch", "", { root: true });
    await dispatch("search/storedE", payload, { root: true });
  },
  clearCurrent({ commit }) {
    commit("CLEAR_CURRENT");
  }
};
