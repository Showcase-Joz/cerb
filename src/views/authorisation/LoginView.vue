<template>
  <div class="login page">
    <Login />

    <router-link active-class="btn-link" to="/register"
      >Register as new User</router-link
    >
  </div>
</template>

<script>
import Login from "../../components/authorisation/Login.vue";
export default {
  name: "loginView",
  components: {
    Login
  },
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