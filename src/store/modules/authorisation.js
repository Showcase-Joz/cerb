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
  user: state => {
    return state.user;
  },
  confirm: state => {
    return state.confirm;
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
  },
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
  ERR_MESSAGE(state, issue) {
    state.authError = issue;
  },
  UPDATECONFIRMEMAIL(state, email) {
    state.registerConfirmEmail = email;
  }
};
export const actions = {
  async signin({ commit, dispatch, state }, { email, password }) {
    state.errMessage = null;
    try {
      await Auth.signIn(email, password);
    } catch (err) {
      commit("ERR_MESSAGE", err);
      return;
    }
    await dispatch("fetchUser");
  },
  // register method that can call another method and sets state
  async register({ commit, state }, { email, password }) {
    state.errMessage = null;
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
      commit("ERR_MESSAGE", err);
      commit("CONFIRM", false);
    }
  },

  async confirm({ commit, dispatch, state }, { email, code }) {
    state.errMessage = null;
    commit("CONFIRM", false);
    await dispatch("updateShowNotice", false, { root: true });
    try {
      await Auth.confirmSignUp(email, code, {
        forceAliasCreation: true
      });
      await dispatch("updateShowNotice", true, { root: true });
      commit("UPDATECONFIRMEMAIL", "");
      await dispatch("updateNotice", {
        code: "neutral",
        message:
          "You have successfully verified your email address. You may now login!"
      }, { root: true });
    } catch (err) {
      await dispatch("updateShowNotice", false, { root: true });
      commit("ERR_MESSAGE", err);
      return;
    }
  },
  async authState({ commit, dispatch }) {
    if (this.authorized) {
      await dispatch("fetchUser");
      await dispatch("updateShowNotice", false, { root: true });
    } else commit("authorisation/USER", null);
  },
  async fetchUser({ commit, dispatch }) {
    try {
      const user = await Auth.currentAuthenticatedUser();
      const expires =
        user.getSignInUserSession().getIdToken().payload.exp -
        Math.floor(new Date().getTime() / 1000);
      console.info(`Token expires in ${expires} seconds`);
      setTimeout(async () => {
        console.info("Renewing Token");
        await dispatch("fetchUser");
      }, expires * 1000);
      commit("USER", user);
    } catch (err) {
      commit("USER", null);
    }
  },
  async logout({ commit, dispatch }) {
    await Auth.signOut();
    commit("USER", null);
    await dispatch("updateShowNotice", false, { root: true });
  },
  updateConfirm({ commit }, payload) {
    commit("CONFIRM", payload);
  },
  setError({ commit }, payload) {
    commit("ERR_MESSAGE", payload);
  }
};
