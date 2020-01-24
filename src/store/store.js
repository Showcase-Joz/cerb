import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    signedIn: false,
    user: null,
    token: null,
    session: null
  },
  getters: {
    collectSessionToken: state => {
      return state.user.signInUserSession.idToken.jwtToken;
    }
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
  }
});
