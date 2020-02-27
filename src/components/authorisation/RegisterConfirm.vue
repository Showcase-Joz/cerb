<template>
  <div>
    <!-- confirm new user form -->
    <div id="register-confirm">
      <h4>SignupConfirm</h4>
      <form
        @submit.prevent.stop="userConfirm"
        @keyup.enter="userConfirm"
        autocomplete="off"
      >
        <input v-model="confirmEmail" required placeholder="email" />
        <input v-model="confirmCode" type="text" required placeholder="code" />
        <a @click="registerUser">not got a code?</a>
        <br />

        <input type="button" value="Confirm my Code" @click="userConfirm" />
        <br />
        <div :value="true" type="info" outline>
          You will need to login after confirming your email.
        </div>
      </form>
      <ErrorOutput />
    </div>

    <Loading v-if="loading" />
  </div>
</template>

<script>
import Loading from "../authorisation/helpers/Loading.vue";
import ErrorOutput from "../authorisation/helpers/ErrorOutput.vue";
export default {
  name: "registerConfirm",
  components: {
    Loading,
    ErrorOutput
  },
  data() {
    return {
      confirmEmail: "",
      confirmCode: "",
      loading: false
    };
  },
  methods: {
    async userConfirm() {
      if (this.confirmEmail === "") {
        this.$store.dispatch("setError", {
          code: "local resolve",
          message: "Email cannot be empty"
        });
        return;
      }
      if (this.confirmCode === "") {
        this.$store.dispatch("setError", {
          code: "local resolve",
          message: "Confirmation code cannot be empty"
        });
        return;
      }
      this.loading = true;
      await this.$store
        .dispatch("confirm", {
          email: this.confirmEmail,
          code: this.confirmCode
        })
        .then(() => {
          if (this.confirmEmail === "") {
            this.$router.push("/");
          }
        });
      this.loading = false;
      return false;
    },
    registerUser: function() {
      this.$store.dispatch("updateConfirm", false);
      this.$store.dispatch("setError", null);
    }
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
