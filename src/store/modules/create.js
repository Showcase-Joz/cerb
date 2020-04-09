export const namespaced = true;

export const state = {
  createdNamespace: "",
  createdName: ""
};

export const getters = {
  createdNamespace: state => {
    return state.createdNamespace;
  },
  createdName: state => {
    return state.createdName;
  }
};

export const mutations = {
  SUB_STRING_NS(state, payload) {
    const stripped = /[^/]*$/.exec(payload)[0];
    state.createdNamespace = stripped;
  },
  SUB_STRING_N(state, payload) {
    const stripped = /[^/]*$/.exec(payload)[0];
    state.createdName = stripped;
  },
};

export const actions = {
  async createNS({ dispatch }, payload) {
    /* !!!! create a three state button animation, default, working, confirm/error

    await dispatch("updateButton", true, { root: true });
    */
    await dispatch("namespace/createNamespace", payload, { root: true });

    // create updateButton confirm/error result
  },
  async createN({ dispatch }, payload) {
    // same as above here!!!
    await dispatch("name/createName", payload, { root: true });
  },
  async subStringNS({ commit, dispatch }, payload) {
    commit("SUB_STRING_NS", payload);
    await dispatch("namespace/selectNS", state.createdNamespace, {
      root: true
    });
  },
  async subStringN({ commit, dispatch }, payload) {
    commit("SUB_STRING_N", payload);
    await dispatch("name/selectN", state.createdName, { root: true });
  }
};
