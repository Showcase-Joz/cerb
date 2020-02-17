<template>
  <div id="logout">
    <button v-if="this.$store.getters.authUser" @click="signOut">
      Sign Out
    </button>
    <div v-if="!this.$store.getters.authUser">
      <strong>You are already logged out</strong>.
      <p>
        Do you want to
        <router-link to="/login">login</router-link>&nbsp;again?
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    signOut: function() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/login");
      });
    }
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>