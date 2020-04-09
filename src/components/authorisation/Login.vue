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
        <Notice v-if="this.showNotice" />
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
import Notice from "../helpers/NoticeOutput.vue";
import Loading from "../authorisation/helpers/Loading.vue";
export default {
  name: "signin",
  components: {
    Loading,
    ErrorOutput,
    Notice
  },
  data() {
    return {
      signinEmail: "",
      signinPassword: "",
      loading: false,
      successURL: "<router-link to='/login'>About</router-link>"
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
            // this.$store.dispatch("updateShowNotice", false);
            this.$store.dispatch("updateNotice", null);
            this.$router.push("/");
          }
        });
      this.loading = false;
      return false;
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authorisation/authUser",
      showNotice: "showNotice"
    })
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
