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
import { mapGetters } from 'vuex';
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
  beforeMount() {
    if (this.registerConfirmEmail !== "") {
      this.confirmEmail = this.registerConfirmEmail;
    }
  },
  methods: {
    async userConfirm() {
      if (this.confirmEmail === "") {
        this.$store.dispatch("authorisation/setError", {
          code: "local resolve",
          message: "Email cannot be empty"
        });
        return;
      }
      if (this.confirmCode === "") {
        this.$store.dispatch("authorisation/setError", {
          code: "local resolve",
          message: "Confirmation code cannot be empty"
        });
        return;
      }
      this.loading = true;
      await this.$store
        .dispatch("authorisation/confirm", {
          email: this.confirmEmail,
          code: this.confirmCode
        })
        .then(() => {
          if (this.confirmEmail === "") {
            this.$router.push("/");
          } else if (this.signUpSuccessful === true) {
            this.$router.push("/login");
          }
        });
      this.loading = false;
      return false;
    },
    registerUser: function() {
      this.$store.dispatch("authorisation/updateConfirm", false);
      this.$store.dispatch("authorisation/setError", null);
    }
  },
  computed: {
    ...mapGetters({
      registerConfirmEmail: "authorisation/registerConfirmEmail",
      signUpSuccessful: "authorisation/signUpSuccessful",
    })
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
