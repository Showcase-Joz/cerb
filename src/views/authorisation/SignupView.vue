<template>
  <div>
    <Register v-if="!this.confirm" />

    <SignUpConfirm v-if="this.confirm" />

    <br />
    <router-link to="/login">Need to Login?</router-link>
  </div>
</template>

<script>
import Register from "../../components/authorisation/Register.vue";
import SignUpConfirm from "../../components/authorisation/RegisterConfirm.vue";
export default {
  name: "signup",
  components: {
    Register,
    SignUpConfirm
  },
  data() {
    return {
      signupForm: false,
      newpassword: false
    };
  },
  async created() {
    this.confirm =
      this.$store.state.user &&
      this.$store.state.user.attributes &&
      !this.$store.state.user.attributes.email_verified;
  },
  methods: {},
  computed: {
    confirm: {
      get() {
        return this.$store.state.authorisation.confirm;
      },
      set(value) {
        this.$store.commit("CONFIRM", value);
      }
    }
  }
};
</script>
