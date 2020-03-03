<template>
  <div class="register page">
    <Register v-if="!this.confirm" />

    <SignUpConfirm v-if="this.confirm" />

    <br />
    <router-link to="/login">Need to Login?</router-link>
  </div>
</template>

<script>
import Register from "../../components/authorisation/Register.vue";
import SignUpConfirm from "../../components/authorisation/RegisterConfirm.vue";
import { mapGetters } from "vuex";
export default {
  name: "signup",
  components: {
    Register,
    SignUpConfirm
  },
  async created() {
    this.confirm =
      this.user && this.user.attributes && !this.user.attributes.email_verified;
  },
  methods: {},
  computed: {
    ...mapGetters({
      user: "authorisation/user"
    }),
    confirm: {
      get() {
        return this.$store.state.authorisation.confirm;
      },
      set(value) {
        this.$store.commit("authorisation/CONFIRM", value);
      }
    }
  }
};
</script>
