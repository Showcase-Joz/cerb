<template>
  <div class="home page">
    <img alt="Vue logo" src="../assets/logo.png" />
    <p v-if="this.authUser">
      Visit the
      <router-link to="/dashboard">Dashboard</router-link>
    </p>
    <p v-if="this.authUser">
      You are currently logged in as
      <strong>{{ currentEmail }}</strong
      >.
    </p>
    <p v-if="this.errMessage">
      There was as error, most recently:
      <ErrorOutput />
    </p>
    <p v-if="!this.authUser">
      You are currently logged out!
      <br />Please <router-link to="/login">Login</router-link>to continue.
    </p>
    <br />
    <Logout v-if="this.authUser" />
    <br />
    <br />
    <br />
    <br />
    <hr style="width:80%; margin: 0 auto;" />
    <br />Check out the <router-link to="/about">dev log</router-link> to see
    what's <em>changed</em>, <strike>broke</strike>/fixed, <strong>new</strong>.
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ErrorOutput from "../components/authorisation/helpers/ErrorOutput.vue";
import Logout from "../components/authorisation/Logout.vue";
export default {
  name: "home",
  components: {
    ErrorOutput,
    Logout
  },
  created() {
    if (this.authUser) {
      console.log("user is Authorised!!");
    }
  },
  computed: {
    // ...mapGetters(["authUser", "currentEmail"]),
    ...mapGetters({
      authUser: "authorisation/authUser",
      currentEmail: "authorisation/currentEmail",
      errMessage: "authorisation/errMessage"
    })
  }
};
</script>
