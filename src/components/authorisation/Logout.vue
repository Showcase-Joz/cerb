<template>
  <div id="logout">
    <p v-if="this.authUser" >Would you like to <button @click="signOut">
      Sign Out
    </button>?</p>
    <div v-if="!this.authUser">
      <strong>You are already logged out</strong>.
      <p>
        Do you want to
        <router-link to="/login">login</router-link>&nbsp;again?
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  name: "Logout",
  methods: {
    signOut: function() {
      this.$store.dispatch("authorisaton/logout").then(() => {
        this.$router.push("/login");
      });
    }
  },
  computed: {
    ...mapGetters({
      authUser: "authorisation/authUser",
    })
  }
};
</script>
<style lang="scss" src="@/styles/_authorisation.scss"></style>
