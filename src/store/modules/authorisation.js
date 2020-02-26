import Auth from "@aws-amplify/auth";

export const namespaced = true;

export const state = {
  authorized: false,
  user: null,
  registerConfirmEmail: "",
  confirm: false,
  authError: null,
};
export const getters = {
  authUser: state => {
    return state.authorized;
  },
  currentEmail: state => {
    if (state.user) {
      return state.user.attributes.email;
    } else {
      return null;
    }
  },
  registerConfirmEmail: state => {
    return state.registerConfirmEmail;
  },
  errMessage: state => {
    if (state.authError) {
      return state.authError;
    }
  }
};
export const mutations = {
  USER(state, user) {
    state.authorized =
      !!user && user.attributes && user.attributes.email_verified;
    state.user = user;
  },
  CONFIRM(state, showConfirm) {
    state.confirm = !!showConfirm;
  },
  ERRMESSAGE(state, issue) {
    state.authError = issue;
  },
  UPDATECONFIRMEMAIL(state, email) {
    state.registerConfirmEmail = email;
  },
};
export const actions = {
  async signin({ commit, dispatch, state }, { email, password }) {
    state.errMessage = "";
    try {
      await Auth.signIn(email, password);
    } catch (err) {
      commit("ERRMESSAGE", err);
      return;
    }
    await dispatch("fetchUser");
  },
  // register method that can call another method and sets state
  async register({ commit, state }, { email, password }) {
    state.errMessage = "";
    state.registerConfirmEmail = "";
    try {
      // call Auth...
      await Auth.signUp({
        username: email,
        email: email,
        password: password,
        attributes: {
          email: email
        },
        validationData: []
      });
      //switch email confirmation form
      commit("CONFIRM", true);
      commit("UPDATECONFIRMEMAIL", email);
    } catch (err) {
      commit("ERRMESSAGE", err);
      commit("CONFIRM", false);
    }
  },

  async confirm({ commit, state }, { email, code }) {
    state.errMessage = "";
    try {
      await Auth.confirmSignUp(email, code, {
        forceAliasCreation: true
      });
      commit("UPDATECONFIRMEMAIL", "");
    } catch (err) {
      commit("ERRMESSAGE", err);
      return;
    }
    commit("CONFIRM", false);
  },
  async authState({ commit, dispatch }, state) {
    if (state === "signedIn") await dispatch("fetchUser");
    else commit("USER", null);
  },
  async fetchUser({ commit, dispatch }) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const expires =
        user.getSignInUserSession().getIdToken().payload.exp -
        Math.floor(new Date().getTime() / 1000);
      console.log(`Token expires in ${expires} seconds`);
      setTimeout(async () => {
        console.log("Renewing Token");
        await dispatch("fetchUser");
      }, expires * 1000);
      commit("USER", user);
    } catch (err) {
      commit("USER", null);
    }
  },
  async logout({ commit }) {
    await Auth.signOut();
    commit("USER", null);
  },
  updateConfirm({ commit }, payload) {
    commit("CONFIRM", payload);
  },
  setError({ commit }, payload) {
    commit("ERRMESSAGE", payload);
  }
};
