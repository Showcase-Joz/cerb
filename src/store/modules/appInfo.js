import api from "../../services/api";

export const namespaced = true;

export const state = {
  appVersion: "0.2.4",
  connectionStatus: navigator.onLine,
  serverStatus: false,
  connectionError: null
};

export const getters = {
  currentVersion: state => {
    return state.appVersion;
  },
  connectionStatus: state => {
    return state.connectionStatus;
  },
  serverStatus: state => {
    return state.serverStatus;
  },
  connectionErr: state => {
    if (state.connectionError) {
      return state.connectionError;
    }
  }
};

export const mutations = {
  SET_CONNECTED(state, payload) {
    state.connectionStatus = payload;
  },
  CONNECTION_STATUS(state, value) {
    state.connectionStatus = value;
  },
  SERVER_STATUS(state, value) {
    state.serverStatus = value;
  },
  CONNECTION_ERR(state, issue) {
    state.connectionError = issue;
  }
};

export const actions = {
  async connectionTest({ commit, dispatch }) {
    state.connectionError = null;
    await window.addEventListener("offline", () => {
      commit("CONNECTION_STATUS", false);
      commit("SERVER_STATUS", false);
      commit("CONNECTION_ERR", {
        code: "local resolve",
        message: "You aren't connected to the internet!!"
      });
    });
    await window.addEventListener("online", () => {
      commit("CONNECTION_STATUS", true);
      dispatch("serverTest");
    });
  },
  async serverTest({ commit, dispatch }) {
    try {
      await api.get("check").then(response => {
        if (response.status === 200) {
          commit("SERVER_STATUS", true);
        } else {
          commit("SERVER_STATUS", false);
          commit("CONNECTION_ERR", {
            code: "local resolve",
            message: "Connection Issues: Trying to connect again."
          });
          dispatch("connectionTest");
        }
      });
    } catch (err) {
      commit("CONNECTION_ERR", {
        code: "local resolve",
        message: "Unable to connect to the server [403]"
      });
    }
  }
};
