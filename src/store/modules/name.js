import api from "../../services/api";
import * as NameSpace from "../modules/namespace";
import * as Created from "../modules/create";

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
    state.selectedName = selectedN;
  }
};

export const actions = {
  async getN({ commit, dispatch }, payload) {
    await dispatch("updateLoading", true, { root: true });
    await dispatch(
      "updateNotice",
      {
        code: "valid",
        message: `Gathering the names inside the ${NameSpace.state.selectedNamespace} namespace`
      },
      { root: true }
    );
    await api.get(payload).then(response => {
      if (response.status === 200) {
        setTimeout(() => {
          commit("CURRENT_NAMES", response.data.names);
          dispatch("updateLoading", false, { root: true });
        }, 1000);
      } else if (response.status !== 200) {
        commit("CURRENT_NAMES", null);
      }
    }),
      await dispatch("updateNotice", null, { root: true });
    err => {
      console.log("Error: ", err);
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
        }, 1500);
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
  }
};
