import api from "../../services/api";
import * as NameSpace from "../modules/namespace";

export const namespaced = true;

export const state = {
  currentNames: null,
  selectedName: "",
  createdName: false
};

export const getters = {
  currentNames: state => {
    return state.currentNames;
  },
  selectedName: state => {
    return state.selectedName;
  },
  createdName: state => {
    return state.createdName;
  }
};

export const mutations = {
  CURRENT_NAMES(state, names) {
    state.currentNames = names;
  },
  SELECTED_NAME(state, selectedN) {
    state.selectedName = selectedN;
  },
  CREATED_NAME(state, value) {
    state.createName = value;
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
        }, 500);
      } else if (response.status !== 200) {
        commit("CURRENT_NAMES", null);
      }
    }),
      err => {
        console.log("Error: ", err);
      };
  },
  async selectedN({ commit }, payload) {
    await commit("SELECTED_NAME", payload);
  },
  async createName({ commit }, payload) {    
    console.log("sent: ", payload);
    
    await api.put(payload).then(response => {
      if (response.status === 201) {
        commit("CREATED_NAME", true);
      } else {
        commit("CREATED_NAME", false);
      }
    })
  }
};
