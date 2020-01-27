import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    signedIn: false,
    user: null
    // token: null,
    // session: null
  },
  getters: {
    // activeUser: state => {
    //   return state.signedIn;
    // }
  },
  mutations: {
    // SET_USER_DATA (state, userData) {
    //   state.user = userData
    //   localStorage.setItem('user', JSON.stringify(userData))
    //   axios.defaults.headers.common['Authorization'] = `Bearer ${
    //     userData.token
    //   }`
    // },
    // CLEAR_USER_DATA () {
    //   localStorage.removeItem('user')
    //   location.reload()
    // }
    // setActiveUser: state => {
    //   state.signedIn = true;
    // },
    // unsetActiveUser: state => {
    //   state.signedIn = false;
    // }
  },
  actions: {
    // activeUser: ({ commit }, payload) => {
    //   commit("activeUser", payload);
    // }
  }
});
