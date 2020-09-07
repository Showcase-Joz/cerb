import api from "../../services/api";
import * as Created from "../modules/create";

export const namespaced = true;

export const state = {
  currentNames: null,
  filteredNames: null,
  selectedName: "",
  counts: {
    totalCount: "",
    count: ""
  }
};

export const getters = {
  currentNames: (state, getters, rootState) => {
    return rootState.search.searchedContent.length > 0
      ? (state.filteredNames = state.currentNames.filter(names =>
          names.includes(rootState.search.searchedContent)
        ))
      : state.currentNames;
  },
  selectedName: state => {
    return state.selectedName;
  },
  counts: state => {
    return state.counts;
  }
};

export const mutations = {
  CURRENT_NAMES(state, names) {
    state.currentNames = names;
  },
  SELECTED_NAME(state, selectedN) {
    state.selectedName = selectedN;
  },
  CLEAR_CURRENT(state) {
    state.currentNames = null;
    state.selectedName = "";
  },
  CURRENT_TOTALCOUNT(state, value) {
    state.counts.totalCount = value;
  },
  CURRENT_COUNT(state, value) {
    state.counts.count = value;
  }
};

export const actions = {
  async getN({ commit, dispatch }, payload) {
    console.log(payload);

    await dispatch("updateLoading", true, { root: true });
    await api.get(payload).then(response => {
      if (response.status === 200) {
        setTimeout(() => {
          commit("CURRENT_NAMES", response.data.names);
          commit("CURRENT_TOTALCOUNT", response.data.totalFound);
          commit("CURRENT_COUNT", response.data.count);
          dispatch("updateLoading", false, { root: true });
        }, 2000);
      } else if (response.status !== 200) {
        commit("CURRENT_NAMES", null);
      }
    }),
      await dispatch("updateNotice", null, { root: true });
    err => {
      console.log("Error: ", err);
      dispatch(
        "updateNotice",
        {
          code: "invalid",
          message: `Failed to get Names`
        },
        { root: true }
      );
    };
  },
  async getLocalN({ dispatch }) {
    await dispatch("updateLoading", true, { root: true });
    setTimeout(() => {
      dispatch("updateLoading", false, { root: true });
    }, 2000);
    await dispatch("updateNotice", null, { root: true });
    err => {
      console.log("Error: ", err);
      dispatch(
        "updateNotice",
        {
          code: "invalid",
          message: `Failed to get local Names`
        },
        { root: true }
      );
    };
  },
  async selectN({ commit, dispatch }, payload) {
    await commit("SELECTED_NAME", payload);
    await dispatch("search/storedSearch", "", { root: true });
    await dispatch("search/storedN", payload, { root: true });
  },
  async createName({ dispatch }, payload) {
    dispatch("spinner", true, { root: true });
    await api.put(payload).then(response => {
      if (response.status === 201) {
        dispatch("createItem/subStringN", payload, { root: true });
        setTimeout(() => {
          dispatch("spinner", false, { root: true });
        }, 2000);
      } else if (response.status === 200) {
        dispatch("updateLoading", true, { root: true });
        dispatch(
          "updateNotice",
          {
            code: "invalid",
            message: `Failed to create ${Created.state.createdName} because: <strong id='msgStrong'>${response.data.message}</strong>`
          },
          { root: true }
        );
      } else {
        dispatch(
          "updateNotice",
          {
            code: "invalid",
            message: `Failed to create ${Created.state.createdName}`
          },
          { root: true }
        );
      }
    });
  },
  clearCurrent({ commit }) {
    commit("CLEAR_CURRENT");
  }
};
