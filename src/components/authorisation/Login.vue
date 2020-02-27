<template>
  <div>
    <!-- signin form -->
    <div id="login">
      <h4>signinView</h4>
      <form @keyup.enter="usersignin" autocomplete="off">
        <input
          v-model="signinEmail"
          type="email"
          name="email"
          placeholder="email"
        />
        <input
          v-model="signinPassword"
          type="password"
          name="password"
          placeholder="password"
        />
        <br />
        <input type="button" value="signin" @click="usersignin" />
      </form>
      <ErrorOutput />
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script>

import { mapGetters } from "vuex";
import ErrorOutput from "../authorisation/helpers/ErrorOutput.vue";
import Loading from "../authorisation/helpers/Loading.vue";
export default {
  name: "signin",
  components: {
    Loading,
    ErrorOutput
  },
  data() {
    return {
      signinEmail: "joz@showcaseimagery.com",
      signinPassword: "!Wired1755",
      loading: false
    };
  },
  methods: {
    async usersignin() {
      // check both fields are filled in
      if (this.signinEmail === null || this.signinPassword === null) {
        this.$store.dispatch("authorisation/setError", {
          name: "Please complete both fields"
        });
        return;
      }
      if (this.signinPassword === "") {
        this.$store.dispatch("authorisation/setError", {
          code: "local resolve",
          message: "Please enter your password!!"
        });
        return;
      }
      this.loading = true;
      await this.$store
        .dispatch("authorisation/signin", {
          email: this.signinEmail,
          password: this.signinPassword
        })
        .then(() => {
          if (this.authUser) {
            this.$router.push("/");
          }
        });
      this.loading = false;
      return false;
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authorisation/authUser"
    })
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
